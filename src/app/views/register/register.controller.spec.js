import registerControllers from './register.controllers';
import userRepositoryService from './../../services/userRepositoryService/userRepository.services';

describe('Register controller', () => {
  let $scope, ionicSideMenuDelegateStub, $state, $ionicPopup, $translate, timeout, userRepository, controller;

  beforeEach(angular.mock.module(registerControllers.name));

  beforeEach(angular.mock.module(userRepositoryService.name));

  beforeEach(inject(($rootScope, $controller, $timeout) => {
    $scope = $rootScope.$new();
    ionicSideMenuDelegateStub = {canDragContent: sinon.spy(), isOpenLeft: sinon.spy(), toggleLeft: sinon.spy};
    $state = {go: sinon.spy()};
    userRepository = {register: sinon.stub()};
    timeout = $timeout;
    $ionicPopup = {alert: sinon.stub()};
    $translate = {instant: sinon.spy()};

    controller = $controller('RegisterController', {
      $scope: $scope,
      $ionicSideMenuDelegate: ionicSideMenuDelegateStub,
      $timeout: timeout,
      $ionicPopup: $ionicPopup,
      $translate: $translate,
      $state: $state,
      userRepository: userRepository
    });

    controller.form = {$valid: true};
  }));

  it('should set up side menu events', () => {
    $scope.$emit('$ionicView.afterEnter');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(false)).to.be.calledOnce;
    $scope.$emit('$ionicView.beforeLeave');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(true)).to.be.calledOnce;
  });

  it('on submit should not try to register when form invalid', () => {
    controller.form.$valid = false;

    controller.onSubmit();

    expect(userRepository.register).to.not.be.called;
  });

  it('on submit should show alert when no internet', done => {
    userRepository.register.returns(Promise.reject(new Error('internet')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect($ionicPopup.alert).to.be.calledOnce;
      done();
    });
  });

  it('on submit should show error and empty password when register failed', done => {
    userRepository.register.returns(Promise.reject(new Error('invalid')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(controller.fields.password).to.be.empty;
      expect(controller.showErrorText).to.be.true;
      timeout.flush();
      expect(controller.showErrorText).to.be.false;
      done();
    });
  });

  it('on submit should remind user to check email when successful', done => {
    userRepository.register.returns(Promise.resolve({isOlmixUser: true}));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect($ionicPopup.alert).to.be.calledOnce;
      done();
    });
  });

  it('on submit should go to login when successful and pressed ok on popup', done => {
    userRepository.register.returns(Promise.resolve({isOlmixUser: true}));
    $ionicPopup.alert.returns(Promise.resolve());

    const onSubmitPromise = controller.onSubmit();

    expect(controller.showLoadingIcon).to.be.true;
    onSubmitPromise.then(() => {
      expect(controller.showLoadingIcon).to.be.false;
      expect($state.go.withArgs('login')).to.be.calledOnce;
      done();
    });
  });
});
