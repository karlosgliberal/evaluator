import reportMangerServices from './reportManager.services';
import networkManagerServices from './../networkManagerService/networkManager.services';
import webManagerService from './../webManagerService/webManager.services';
import localStorageManagerServices from './../localStorageManagerService/localStorageManager.services';

import animals from './../../utils/animal';

describe('network Manager service', () => {
  var reportMangerService,
      networkManagerServiceStub,
      webManagerServiceStub,
      q,
      getDeferred,
      scope,
      localStorageManagerSpy;

  beforeEach(angular.mock.module(networkManagerServices.name, ($provide) => {
    networkManagerServiceStub = {isOnline: sinon.stub()};
    $provide.value('networkManagerService', networkManagerServiceStub);
  }));

  beforeEach(angular.mock.module(webManagerService.name, ($provide) => {
    webManagerServiceStub = {sendDataDrupal: sinon.stub()};
    $provide.value('webManagerService', webManagerServiceStub);
  }));

  beforeEach(angular.mock.module(localStorageManagerServices.name, ($provide) => {
    localStorageManagerSpy = {save: sinon.spy()};
    $provide.value('localStorageManager', localStorageManagerSpy);
  }));

  beforeEach(angular.mock.module(reportMangerServices.name));

  beforeEach(inject((_reportManagerService_, $q, $rootScope)=> {
    q = $q;
    scope = $rootScope.$new();
    getDeferred = q.defer();
    reportMangerService = _reportManagerService_;
  }));

  it('should follow report sending flow', () => {
    networkManagerServiceStub.isOnline.returns(true);
    webManagerServiceStub.sendDataDrupal.withArgs().returns(q.when({
      data: 'SuccessfiN'
    }));

    var reportResult = reportMangerService.sendReport('::animal::', '::result', '::email::');

    expect(networkManagerServiceStub.isOnline.withArgs()).to.be.called.once;
    expect(webManagerServiceStub.sendDataDrupal.withArgs('::animal::', '::result', '::email::')).to.be.called.once;
    expect(reportResult).to.be.eql({result: 'ok'});
  });

  it('should return internet error', () => {
    networkManagerServiceStub.isOnline.returns(false);
    var saveDataSpy = sinon.spy(reportMangerService, 'saveData');

    var reportResult = reportMangerService.sendReport('::animal::', '::result', '::email::');

    expect(networkManagerServiceStub.isOnline.withArgs()).to.be.called.once;
    expect(webManagerServiceStub.sendDataDrupal).to.not.be.called.once;
    expect(saveDataSpy.withArgs('::animal::', '::result', '::email::')).to.be.called.once;
    expect(reportResult).to.be.eql({result: 'error', error: 'internet'});
  });

  //it.only('should return server error', () => {
  //  var _mockPromise = {
  //    then: (successFn, errorFn) => {
  //      errorFn();
  //    },
  //    error: (fn) {
  //      fn();
  //    }
  //  };
  //  networkManagerServiceStub.isOnline.returns(true);
  //  webManagerServiceStub.sendDataDrupal.withArgs('::animal::', '::result', '::email::').returns(() => {
  //    return _mockPromise;
  //  });
  //
  //  var reportResult = reportMangerService.sendReport('::animal::', '::result', '::email::');
  //
  //  expect(networkManagerServiceStub.isOnline.withArgs()).to.be.called.once;
  //  expect(webManagerServiceStub.sendDataDrupal.withArgs('::animal::', '::result', '::email::')).to.be.called.once;
  //  expect(reportResult).to.be.eql({error: 'server'});
  //});

  it('should save data', () => {
    var dataToSave = {
      animal: 'cow',
      result: 5,
      email: 'aitor@cantinflas.com'
    };

    var clock = sinon.useFakeTimers(new Date(2016, 2, 15).getTime());
    clock.tick(60 * 60 * 2 * 1000);

    reportMangerService.saveData(animals.COW, 5, 'aitor@cantinflas.com');

    expect(localStorageManagerSpy.save.withArgs('Evaluation-' + Date.now(), JSON.stringify(dataToSave)).callCount).to.be.equal(1);
  });
});
