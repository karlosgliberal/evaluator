import { assign } from 'lodash';

const userStorageKey = 'user';

export default class LoginController {
  /*@ngInject*/
  constructor($scope, $ionicSideMenuDelegate, $timeout, $state, $ionicPopup, $translate, localStorageManager, userRepository) {
    assign(this, {$scope, $ionicSideMenuDelegate, $timeout, $state, $ionicPopup, $translate, localStorageManager, userRepository});

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

  goToRegister() {
    this.$state.go('register');
  }

  saveUserInLocalStorage(user) {
    this.localStorageManager.save(userStorageKey, user);
  }

  getUserFromLocalStorage() {
    return this.localStorageManager.getDataFor(userStorageKey);
  }
}
