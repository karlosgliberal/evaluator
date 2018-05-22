import registerControllers from './register.controllers';
import userRepositoryService from './../../services/userRepositoryService/userRepository.services';

describe('Register controller', () => {
  let $scope, ionicSideMenuDelegateStub, $state, $translate, timeout, popupManager, userRepository, controller;

  beforeEach(angular.mock.module(registerControllers.name));

  beforeEach(angular.mock.module(userRepositoryService.name));

  beforeEach(inject(($rootScope, $controller, $timeout) => {
    $scope = $rootScope.$new();
    ionicSideMenuDelegateStub = {canDragContent: sinon.spy(), isOpenLeft: sinon.spy(), toggleLeft: sinon.spy};
    $state = {go: sinon.spy()};
    userRepository = {register: sinon.stub()};
    timeout = $timeout;
    popupManager = {alert: sinon.stub()};
    $translate = {instant: sinon.spy()};

    controller = $controller('RegisterController', {
      $scope: $scope,
      $ionicSideMenuDelegate: ionicSideMenuDelegateStub,
      $timeout: timeout,
      popupManager: popupManager,
      $translate: $translate,
      $state: $state,
      userRepository: userRepository
    });

    controller.form = {$valid: true};
    controller.form.lopd = { $valid: true };
  }));

  it('should set up side menu events', () => {
    $scope.$emit('$ionicView.afterEnter');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(false)).to.be.calledOnce;
    $scope.$emit('$ionicView.beforeLeave');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(true)).to.be.calledOnce;
  });

  it('should not try to register but show error when lopd not filled in', () => {
    controller.form.lopd.$valid = false;

    controller.onSubmit();

    expect(userRepository.register).to.not.be.called;
    expect(controller.errorTextKey).to.equal('register.lopd.error');
  });

  it('should not try to register but show error when form submit invalid', () => {
    controller.form.$valid = false;

    controller.onSubmit();

    expect(userRepository.register).to.not.be.called;
    expect(controller.errorTextKey).to.equal('register.invalid');
  });

  it('should show alert when submit without internet', done => {
    userRepository.register.returns(Promise.reject(new Error('internet')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(popupManager.alert).to.be.calledOnce;
      done();
    });
  });

  it('should show error and empty password when register submit failed', done => {
    userRepository.register.returns(Promise.reject(new Error('invalid')));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(controller.fields.password).to.be.empty;
      expect(controller.errorTextKey).to.equal('register.error');
      timeout.flush();
      expect(controller.errorTextKey).to.equal('');
      done();
    });
  });

  it('should remind user to check email when successful register submit', done => {
    userRepository.register.returns(Promise.resolve({isOlmixUser: true}));

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(popupManager.alert).to.be.calledOnce;
      done();
    });
  });

  it('should go to login when successful submit and pressed ok on popup', done => {
    userRepository.register.returns(Promise.resolve({isOlmixUser: true}));
    popupManager.alert.returns(Promise.resolve());

    const onSubmitPromise = controller.onSubmit();

    expect(controller.showLoadingIcon).to.be.true;
    onSubmitPromise.then(() => {
      expect(controller.showLoadingIcon).to.be.false;
      expect($state.go.withArgs('login')).to.be.calledOnce;
      done();
    });
  });
});
