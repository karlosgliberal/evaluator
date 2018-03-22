import reportMangerServices from './reportManager.services';
import networkManagerServices from './../networkManagerService/networkManager.services';
import webManagerService from './../webManagerService/webManager.services';
import localStorageManagerServices from './../localStorageManagerService/localStorageManager.services';

describe('Report Manager service', () => {
  let reportMangerService,
    networkManagerServiceStub,
    webManagerServiceStub,
    q,
    getDeferred,
    scope,
    localStorageManagerSpy;

  beforeEach(angular.mock.module(networkManagerServices.name, ($provide) => {
    networkManagerServiceStub = {isOffline: sinon.stub(), startWatching: sinon.stub()};
    $provide.value('networkManagerService', networkManagerServiceStub);
  }));

  beforeEach(angular.mock.module(webManagerService.name, ($provide) => {
    webManagerServiceStub = {sendDataDrupal: sinon.stub()};
    $provide.value('webManagerService', webManagerServiceStub);
  }));

  beforeEach(angular.mock.module(localStorageManagerServices.name, ($provide) => {
    localStorageManagerSpy = {save: sinon.spy(), getDataFor: sinon.stub()};
    $provide.value('localStorageManager', localStorageManagerSpy);
  }));

  beforeEach(angular.mock.module(reportMangerServices.name));

  beforeEach(inject((_reportManagerService_, $q, $rootScope) => {
    q = $q;
    scope = $rootScope.$new();
    getDeferred = q.defer();
    reportMangerService = _reportManagerService_;
  }));

  it('should follow report sending flow without adding contact data when doesnt exist', done => {
    let expectedResult = JSON.stringify({percentage: 25, email: '::email::'});
    let evaluationResult = {percentage: 25};
    localStorageManagerSpy.getDataFor.returns(null);
    networkManagerServiceStub.isOffline.returns(false);
    webManagerServiceStub.sendDataDrupal.returns(Promise.resolve());

    const reportPromise = reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(expectedResult)).to.be.calledOnce;
    reportPromise.then(() => {
      expect(localStorageManagerSpy.getDataFor).to.be.calledOnce;
      done();
    });
  });

  it('should follow report sending flow adding contact data when exists', () => {
    let expectedResult = JSON.stringify({
      percentage: 25,
      email: '::email::,::contactEmail::',
      contactData: {
        name: '::name::',
        email: '::contactEmail::'
      }
    });
    let evaluationResult = {percentage: 25};
    localStorageManagerSpy.getDataFor.returns('{"name": "::name::","email": "::contactEmail::"}');
    networkManagerServiceStub.isOffline.returns(false);
    webManagerServiceStub.sendDataDrupal.returns(Promise.resolve());

    reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(expectedResult)).to.be.calledOnce;
    expect(localStorageManagerSpy.getDataFor).to.be.calledOnce;
  });

  it('should not follow report sending flow when not online', () => {
    networkManagerServiceStub.isOffline.returns(true);
    let evaluationResult = {percentage: 25};

    reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(evaluationResult)).to.be.not.called;
    expect(localStorageManagerSpy.save).to.be.calledTwice;
  });

  it('should not follow report sending flow when an error happens', done => {
    let expectedResult = JSON.stringify({
      percentage: 25,
      email: '::email::'
    });
    let evaluationResult = {percentage: 25};
    localStorageManagerSpy.getDataFor.returns(null);
    networkManagerServiceStub.isOffline.returns(false);
    webManagerServiceStub.sendDataDrupal.returns(Promise.reject());

    const reportPromise = reportMangerService.sendReport('::animal::', evaluationResult, '::email::');

    expect(webManagerServiceStub.sendDataDrupal.withArgs(expectedResult)).to.be.calledOnce;
    reportPromise.then(() => {
      expect(localStorageManagerSpy.save).to.be.calledTwice;
      done();
    });
  });

  it('should save data', () => {
    let report = {
      animal: 'cow',
      result: 5,
      email: 'aitor@cantinflas.com'
    };

    let clock = sinon.useFakeTimers(new Date(2016, 2, 15).getTime());
    clock.tick(60 * 60 * 2 * 1000);

    reportMangerService.saveData(report);
    expect(localStorageManagerSpy.save.withArgs('cola', 1)).to.be.calledOnce;
    expect(localStorageManagerSpy.save.withArgs('Evaluation-' + Date.now(), report)).to.be.calledOnce;
  });
});
