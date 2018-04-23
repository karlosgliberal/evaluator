import logoutControllers from './logout.controllers';
import localStorageManager from './../../services/localStorageManagerService/localStorageManager.services';

describe('Logout controller', () => {
  let $state, $ionicPopup, $translate, localStorageManagerStub, controller;

  beforeEach(angular.mock.module(logoutControllers.name));

  beforeEach(angular.mock.module(localStorageManager.name));

  beforeEach(inject(($controller) => {
    $state = {go: sinon.spy()};
    $ionicPopup = {confirm: sinon.stub()};
    $translate = {instant: sinon.spy()};
    localStorageManagerStub = {remove: sinon.spy()};

    controller = $controller('LogoutController', {
      $state: $state,
      $ionicPopup: $ionicPopup,
      $translate: $translate,
      localStorageManager: localStorageManagerStub
    });
  }));

  it('should not remove user when user cancelled', done => {
    $ionicPopup.confirm.returns(Promise.resolve(false));

    const confirmPromise = controller.prompt();

    confirmPromise.then(() => {
      expect(localStorageManagerStub.remove).to.not.be.called;
      done();
    });
  });

  it('should remove user and redirect when user confirmed', done => {
    $ionicPopup.confirm.returns(Promise.resolve(true));

    const confirmPromise = controller.prompt();

    confirmPromise.then(() => {
      expect(localStorageManagerStub.remove.withArgs('user')).to.be.calledOnce;
      expect($state.go.withArgs('login')).to.be.calledOnce;
      done();
    });
  });
});
