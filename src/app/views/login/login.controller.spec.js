import loginControllers from './login.controllers';
import localStorageManager from './../../services/localStorageManagerService/localStorageManager.services';
import userRepositoryService from './../../services/userRepositoryService/userRepository.services';

describe('Login controller', () => {
  let $state, $scope, $ionicPopup, $translate, ionicSideMenuDelegateStub, userRepository, localStorageManagerStub,
    timeout, controller;

  beforeEach(angular.mock.module(loginControllers.name));

  beforeEach(angular.mock.module(localStorageManager.name));

  beforeEach(angular.mock.module(userRepositoryService.name));

  beforeEach(inject(($controller, $rootScope, $timeout) => {
    $scope = $rootScope.$new();
    $state = {go: sinon.spy()};
    ionicSideMenuDelegateStub = {canDragContent: sinon.spy(), isOpenLeft: sinon.spy(), toggleLeft: sinon.spy};
    localStorageManagerStub = {getDataFor: sinon.stub(), save: sinon.stub()};
    userRepository = {login: sinon.stub()};
    timeout = $timeout;
    $ionicPopup = {alert: sinon.spy()};
    $translate = {instant: sinon.spy()};

    controller = $controller('LoginController', {
      $scope: $scope,
      $state: $state,
      $timeout: timeout,
      $ionicSideMenuDelegate: ionicSideMenuDelegateStub,
      $ionicPopup: $ionicPopup,
      $translate: $translate,
      userRepository: userRepository,
      localStorageManager: localStorageManagerStub
    });

    controller.form = {$valid: true, $setPristine: sinon.stub(), $setUntouched: sinon.stub()};
  }));

  it('should set up side menu events', () => {
    $scope.$emit('$ionicView.beforeEnter');

    expect(ionicSideMenuDelegateStub.canDragContent).to.be.calledOnce;
  });

  it('on submit should not try to login when form invalid', () => {
    controller.form.$valid = false;

    controller.onSubmit();

    expect(userRepository.login).to.not.be.called;
  });

  it('on submit should show alert when no internet', done => {
    userRepository.login.returns(Promise.reject(new Error('internet')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect($ionicPopup.alert).to.be.calledOnce;
      done();
    });
  });

  it('on submit should show error and empty password when login invalid', done => {
    userRepository.login.returns(Promise.reject(new Error('invalid')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(controller.fields.password).to.be.empty;
      expect(controller.showErrorText).to.be.true;
      timeout.flush();
      expect(controller.showErrorText).to.be.false;
      done();
    });
  });

  it('on submit should save user and go to animal selection when successful', done => {
    userRepository.login.returns(Promise.resolve({isOlmixUser: true}));

    const onSubmitPromise = controller.onSubmit();

    expect(controller.showLoadingIcon).to.be.true;
    onSubmitPromise.then(() => {
      expect(controller.showLoadingIcon).to.be.false;
      expect(localStorageManagerStub.save.withArgs('user', {isOlmixUser: true})).to.be.calledOnce;
      expect($state.go.withArgs('animalSelection')).to.be.calledOnce;
      done();
    });
  });
});
