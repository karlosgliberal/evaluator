import { assign } from 'lodash';

export default class RegisterController {
  /*@ngInject*/
  constructor($scope, $ionicSideMenuDelegate, $timeout, $translate, $state, userRepository, popupManager) {
    assign(this, {$scope, $ionicSideMenuDelegate, $timeout, $translate, $state, userRepository, popupManager});

    this.setUpSideMenu();

    this.showLoadingIcon = false;
    this.showErrorText = false;
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
    if (!this.form.$valid) {
      this.handleError();
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
          this.showErrorAndResetForm();
        }
      })
      .finally(() => {
        this.showLoadingIcon = false;
      });
  }

  handleError() {
    this.showErrorText = true;
    this.$timeout(() => {
      this.showErrorText = false;
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

  showErrorAndResetForm() {
    this.fields.password = '';
    this.showErrorText = true;

    this.$timeout(() => {
      this.showErrorText = false;
    }, 3000);
  }

  goToLogin() {
    this.$state.go('login');
  }
}
