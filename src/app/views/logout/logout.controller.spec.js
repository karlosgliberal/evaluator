import logoutControllers from './logout.controllers';
import localStorageManager from './../../services/localStorageManagerService/localStorageManager.services';

describe('Logout controller', () => {
  let $state, $translate, localStorageManagerStub, popupManagerStub, controller;

  beforeEach(angular.mock.module(logoutControllers.name));

  beforeEach(angular.mock.module(localStorageManager.name));

  beforeEach(inject(($controller) => {
    $state = {go: sinon.spy()};
    $translate = {instant: sinon.spy()};
    localStorageManagerStub = {removeAll: sinon.spy()};
    popupManagerStub = {prompt: sinon.stub()};

    controller = $controller('LogoutController', {
      $state: $state,
      $translate: $translate,
      localStorageManager: localStorageManagerStub,
      popupManager: popupManagerStub
    });
  }));

  it('should not remove all data when user cancelled', done => {
    popupManagerStub.prompt.returns(Promise.resolve(false));

    const confirmPromise = controller.prompt();

    confirmPromise.then(() => {
      expect(localStorageManagerStub.removeAll).to.not.be.called;
      done();
    });
  });

  it('should remove all data and redirect when user confirmed', done => {
    popupManagerStub.prompt.returns(Promise.resolve(true));

    const confirmPromise = controller.prompt();

    confirmPromise.then(() => {
      expect(localStorageManagerStub.removeAll).to.be.calledOnce;
      expect($state.go.withArgs('login')).to.be.calledOnce;
      done();
    });
  });
});
