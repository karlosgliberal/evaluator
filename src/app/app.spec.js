// all of our Jasmine and Sinon utilities (describe, it, sinon) are globally
// injected by Karma. no need to import them manually for each test.
import App from './app';

describe('Application Tests', () => {
  let sandbox, stateStub, controller, scope, localStorageManagerStub, $timeout;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(angular.mock.module(App.name));

  beforeEach(inject(($controller, $q, $rootScope, _$timeout_) => {
    scope = $rootScope.$new();
    localStorageManagerStub = {getDataFor: sinon.stub()};
    stateStub = {$state: {go: sandbox.stub()}};

    controller = $controller('AppController', {
      $state: stateStub.$state,
      localStorageManager: localStorageManagerStub
    });
    $timeout = _$timeout_;
  }));

  afterEach(() => {
    sandbox.reset();
  });

  describe('App Controller', () => {

    it('should be defined', () => {
      expect(controller).to.be.ok;
    });

    it('should transition to language selection component', () => {
      controller.goToLanguageSelection();
      expect(stateStub.$state.go).to.be.calledOnce;
      expect(stateStub.$state.go).to.have.been.calledWith('idioma');
    });

    it('should transition to animal selection component', () => {
      controller.goToAnimalSelection();
      expect(stateStub.$state.go).to.be.calledOnce;
      expect(stateStub.$state.go).to.have.been.calledWith('animalSelection');
    });

    it('should call localStorage', () => {
      expect(localStorageManagerStub.getDataFor.withArgs('language')).to.be.calledOnce;
    });

    it('should decide to go to animal selection', () => {
      controller.goToNextScreen('::language::');
      //$timeout.flush();
      // expect(stateStub.$state.go).to.have.been.calledWith('animalSelection');
    });
    it('should decide to go to language selection', () => {
      controller.goToNextScreen(null);
      expect(stateStub.$state.go).to.have.been.calledWith('idioma');
    });
  });
});
