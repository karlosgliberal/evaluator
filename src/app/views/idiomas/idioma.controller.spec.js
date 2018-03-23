import idiomaControllers from './idioma.controllers';
import localStorageManager from './../../services/localStorageManagerService/localStorageManager.services';
import languageFormService from './../../services/languageFormService/languageForm.services';

describe('Idioma controller', () => {
  let $state, $translate, $scope, ionicSideMenuDelegateStub, ionicHistoryStub, languageFormServiceSpy, localStorageManagerStub,
    controller;

  beforeEach(angular.mock.module(idiomaControllers.name, 'pascalprecht.translate', 'ui.router'));

  beforeEach(angular.mock.module(localStorageManager.name));

  beforeEach(angular.mock.module(languageFormService.name, $provide => {
    languageFormServiceSpy = {generateFormRadio: sinon.spy()};
    $provide.value('languageFormService', languageFormServiceSpy);
  }));

  beforeEach(inject(($controller, $rootScope) => {
    $state = {go: sinon.spy()};
    ionicSideMenuDelegateStub = {canDragContent: sinon.spy(), isOpenLeft: sinon.spy(), toggleLeft: sinon.spy};
    ionicHistoryStub = {clearHistory: sinon.stub(), clearCache: () => Promise.resolve()};
    localStorageManagerStub = {getDataFor: sinon.stub(), save: sinon.stub()};
    $translate = {use: sinon.stub(), refresh: sinon.stub()};
    $scope = $rootScope.$new();

    controller = $controller('IdiomaController', {
      $state: $state,
      $rootScope: $rootScope,
      $scope: $scope,
      $ionicSideMenuDelegate: ionicSideMenuDelegateStub,
      $translate: $translate,
      $ionicHistory: ionicHistoryStub,
      localStorageManager: localStorageManagerStub
    });
  }));

  it('should not set up side menu events when previous state is not home', () => {
    controller.previousStateHome = false;

    controller.setUpSideMenu();
    $scope.$emit('$ionicView.afterEnter');

    expect(ionicSideMenuDelegateStub.canDragContent).to.not.be.called;
  });

  it('should set up side menu events when previous state is home', () => {
    controller.previousStateHome = true;

    controller.setUpSideMenu();

    $scope.$emit('$ionicView.afterEnter');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(false)).to.be.calledOnce;
    $scope.$emit('$ionicView.beforeLeave');
    expect(ionicSideMenuDelegateStub.canDragContent.withArgs(true)).to.be.calledOnce;
  });

  it('should return null when no language stored', () => {
    localStorageManagerStub.getDataFor.returns(null);

    const userLanguage = controller.setUpUserLanguage();

    expect(userLanguage).to.be.null;
  });

  it('should return prepared language when language stored', () => {
    localStorageManagerStub.getDataFor.returns('"en"');

    const userLanguage = controller.setUpUserLanguage();

    expect(userLanguage).to.be.eql('en');
  });

  it('state should go to animal selection when previous state is not home', () => {
    controller.previousStateHome = false;

    controller.goToNextScreen();

    expect($state.go.withArgs('animalSelection', {}, {reload: true})).to.be.calledOnce;
  });

  it('state should go to login when previous state is home', () => {
    controller.previousStateHome = true;

    controller.goToNextScreen();

    expect($state.go.withArgs('login')).to.be.calledOnce;
  });

  it('on selector change should refresh translate and go to next screen', done => {
    controller.previousStateHome = true;
    controller.selectorViewModel.selector = 'en';

    const clearCachePromise = controller.onSelectorChange();

    expect(localStorageManagerStub.save.withArgs('language', 'en')).to.be.calledOnce;
    clearCachePromise.then(() => {
      expect($state.go.withArgs('login')).to.be.calledOnce;
      done();
    });
  });
});
