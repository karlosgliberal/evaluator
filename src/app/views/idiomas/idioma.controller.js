import { assign } from 'lodash';

export default class IdiomaController {
  /*@ngInject*/
  constructor(
    $rootScope,
    $scope,
    $ionicSideMenuDelegate,
    $translate,
    $state,
    $ionicHistory,
    localStorageManager,
    languageFormService,
  ) {
    assign(this, {
      $scope,
      $ionicSideMenuDelegate,
      $translate,
      $state,
      $ionicHistory,
      localStorageManager,
      languageFormService,
    });

    this.previousStateHome = $rootScope.previousState === 'home';
    this.setUpSideMenu();

    const userLanguage = this.setUpUserLanguage();
    this.selectorViewModel = {};
    this.selector = this.languageFormService.generateFormRadio(this, userLanguage);
  }

  setUpUserLanguage() {
    let userLanguage = this.localStorageManager.getDataFor('language');
    if (userLanguage) {
      userLanguage = userLanguage.replace(/(^\")|("$)/gi, '');
      this.$translate.use(userLanguage);
      this.$translate.refresh(userLanguage);
    }

    return userLanguage;
  }

  setUpSideMenu() {
    if (this.previousStateHome) {
      this.$scope.$on('$ionicView.afterEnter', () => {
        if (this.$ionicSideMenuDelegate.isOpenLeft()) {
          this.$ionicSideMenuDelegate.toggleLeft();
        }
        this.$ionicSideMenuDelegate.canDragContent(false);
      });
      this.$scope.$on('$ionicView.beforeLeave', () => {
        this.$ionicSideMenuDelegate.canDragContent(true);
      });
    }
  }

  onSelectorChange() {
    this.$translate.use(this.selectorViewModel.selector);
    this.$translate.refresh(this.selectorViewModel.selector);
    this.localStorageManager.save('language', this.selectorViewModel.selector);
    this.$ionicHistory.clearHistory();

    return this.$ionicHistory.clearCache()
      .then(() => {
        this.goToNextScreen();
      });
  }

  goToNextScreen() {
    if (this.previousStateHome) {
      this.$state.go('login');
    } else {
      this.$state.go('animalSelection', {}, {reload: true});
    }
  }
}
