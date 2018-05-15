import { assign } from 'lodash';

export default class RegisterController {
  /*@ngInject*/
  constructor($scope, $ionicSideMenuDelegate, $timeout, $state, userRepository, popupManager) {
    assign(this, {$scope, $ionicSideMenuDelegate, $timeout, $state, userRepository, popupManager});

    this.setUpSideMenu();

    this.showLoadingIcon = false;
    this.errorTextKey = '';
    this.fields = {
      name: '',
      surname: '',
      company: '',
      email: '',
      password: '',
      lopd: false,
      mailing: false,
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
    if (!this.form.lopd.$valid) {
      this.handleError('register.lopd.error');
      return;
    }

    if (!this.form.$valid) {
      this.handleError('register.invalid');
      return;
    }

    this.showLoadingIcon = true;
    return this.userRepository
      .register(this.fields)
      .then(() => {
        this.showEmailPopup();
      })
      .catch(error => {
        if (error.message === 'internet') {
          this.showInternetError();
        } else {
          this.showErrorAndResetForm('register.error');
        }
      })
      .finally(() => {
        this.showLoadingIcon = false;
      });
  }

  handleError(errorTextKey) {
    this.errorTextKey = errorTextKey;
    this.$timeout(() => {
      this.errorTextKey = '';
    }, 3000);
  }

  showInternetError() {
    this.popupManager.alert('internet_error');
  }

  showEmailPopup() {
    this.popupManager
      .alert('login.email_confirmation')
      .then(() => {
        this.goToLogin();
      });
  }

  showErrorAndResetForm(errorTextKey) {
    this.fields.password = '';
    this.handleError(errorTextKey);
  }

  goToLogin() {
    this.$state.go('login');
  }
}
