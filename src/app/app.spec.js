// all of our Jasmine and Sinon utilities (describe, it, sinon) are globally
// injected by Karma. no need to import them manually for each test.
import App from './app';
import localStorageManager from './services/localStorageManagerService/localStorageManager.services';

describe('Application Tests', () => {
  let sandbox, stateStub, $timeout, localStorageManagerStub, controller;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(angular.mock.module(App.name));

  beforeEach(angular.mock.module(localStorageManager.name));

  beforeEach(() => {
    stateStub = {$state: {go: sandbox.stub()}};
    localStorageManagerStub = {getDataFor: sinon.stub()};
  });

  afterEach(() => {
    sandbox.reset();
  });

  const createAppController = inject(($controller, _$timeout_, $httpBackend) => {
    $httpBackend.whenGET('assets/locales/en.json').respond({});
    $timeout = _$timeout_;

    controller = $controller('AppController', {
      $state: stateStub.$state,
      localStorageManager: localStorageManagerStub
    });
  });

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('App Controller', () => {
    it('should be defined', () => {
      createAppController();

      expect(controller).to.be.ok;
    });

    it('should decide to go to language when no language found', () => {
      localStorageManagerStub.getDataFor.returns(null);
      createAppController();

      $timeout.flush();

      expect(stateStub.$state.go).to.be.calledWith('idioma');
    });

    it('should decide to go to login when language found', () => {
      localStorageManagerStub.getDataFor.returns('en');
      createAppController();

      $timeout.flush();

      expect(stateStub.$state.go).to.be.calledWith('login');
    });
  });
});
