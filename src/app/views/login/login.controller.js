import { assign } from 'lodash';

const userStorageKey = 'user';

export default class LoginController {
  /*@ngInject*/
  constructor(
    $scope,
    $timeout,
    $ionicSideMenuDelegate,
    $state,
    $ionicPopup,
    $translate,
    localStorageManager,
    userRepository
  ) {
    assign(this, {
      $scope,
      $timeout,
      $ionicSideMenuDelegate,
      $state,
      $ionicPopup,
      $translate,
      localStorageManager,
      userRepository
    });

    if (this.getUserFromLocalStorage()) {
      this.goToAnimalSelection();
    }

    this.setUpSideMenu();

    this.showLoadingIcon = false;
    this.showErrorText = false;
    this.fields = {
      email: '',
      password: ''
    };
  }

  setUpSideMenu() {
    this.$scope.$on('$ionicView.beforeEnter', () => {
      if (this.$ionicSideMenuDelegate.isOpenLeft()) {
        this.$ionicSideMenuDelegate.toggleLeft();
      }
      this.$ionicSideMenuDelegate.canDragContent(false);
    });
    this.$scope.$on('$ionicView.afterLeave', () => {
      this.$ionicSideMenuDelegate.canDragContent(true);
    });
  }

  onSubmit() {
    if (this.form.$valid) {
      this.showLoadingIcon = true;
      return this.userRepository
        .login(this.fields.email, this.fields.password)
        .then(user => {
          this.showLoadingIcon = false;
          this.saveUserInLocalStorage(user);
          this.goToAnimalSelection();
        })
        .catch(error => {
          this.showLoadingIcon = false;
          if (error.message === 'internet') {
            this.showInternetError();
          } else {
            this.showErrorAndResetForm();
          }
        });
    }
  }

  showInternetError() {
    this.$ionicPopup.alert({
      title: this.$translate.instant('internet_error')
    });
  }

  showErrorAndResetForm() {
    this.fields.password = '';
    this.showErrorText = true;
    this.form.$setPristine();
    this.form.$setUntouched();

    this.$timeout(() => {
      this.showErrorText = false;
    }, 3000);
  }

  goToAnimalSelection() {
    this.$state.go('animalSelection');
  }

  saveUserInLocalStorage(user) {
    this.localStorageManager.save(userStorageKey, user);
  }

  getUserFromLocalStorage() {
    return this.localStorageManager.getDataFor(userStorageKey);
  }
}
