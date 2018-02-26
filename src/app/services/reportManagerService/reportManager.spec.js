import reportMangerServices from './reportManager.services';
import networkManagerServices from './../networkManagerService/networkManager.services';
import webManagerService from './../webManagerService/webManager.services';
import localStorageManagerServices from './../localStorageManagerService/localStorageManager.services';

describe('Report Manager service', () => {
  var reportMangerService,
    networkManagerServiceStub,
    webManagerServiceStub,
    q,
    getDeferred,
    scope,
    localStorageManagerSpy;

  beforeEach(angular.mock.module(networkManagerServices.name, ($provide) => {
    networkManagerServiceStub = {isOnline: sinon.stub(), startWatching: sinon.stub()};
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

  beforeEach(inject((_reportManagerService_, $q, $rootScope) => {
    q = $q;
    scope = $rootScope.$new();
    getDeferred = q.defer();
    reportMangerService = _reportManagerService_;
  }));

  it('should follow report sending flow', () => {
    let expectedResult = JSON.stringify({percentage: 25, email: '::email::'});
    let evaluationResult = {percentage: 25};
    networkManagerServiceStub.isOnline.returns(true);
    networkManagerServiceStub.startWatching.returns(true);
    webManagerServiceStub.sendDataDrupal.withArgs().returns(Promise.resolve());

    const reportResult = reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(expectedResult)).to.be.calledOnce;
    expect(reportResult).to.be.eql({result: 'ok'});
  });

  it('should not follow report sending flow', () => {
    networkManagerServiceStub.isOnline.returns(false);
    networkManagerServiceStub.startWatching.returns(true);
    let evaluationResult = {email: 'correo'};

    const reportResult = reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(evaluationResult)).to.be.not.called;
    expect(reportResult).to.be.eql({result: 'error', error: 'internet'});
  });

  it('should return internet error', () => {
    networkManagerServiceStub.isOnline.returns(false);
    let saveDataSpy = sinon.spy(reportMangerService, 'saveData');
    let evaluationResult = {email: 'correo'};

    var reportResult = reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    //expect(saveDataSpy.withArgs('::animal::', '::result', '::email::')).to.be.called.once;
    expect(reportResult).to.be.eql({result: 'error', error: 'internet'});
    expect(localStorageManagerSpy.save.callCount).to.be.equal(2);
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
    let dataToSave = {
      animal: 'cow',
      result: 5,
      email: 'aitor@cantinflas.com'
    };

    let clock = sinon.useFakeTimers(new Date(2016, 2, 15).getTime());
    clock.tick(60 * 60 * 2 * 1000);

    reportMangerService.saveData(dataToSave);
    expect(localStorageManagerSpy.save.withArgs('cola', 1)).to.be.calledOnce;
    // expect(localStorageManagerSpy.save.withArgs('Evaluation-' + Date.now(), JSON.stringify(dataToSave))).to.be.calledOnce;
  });
});
