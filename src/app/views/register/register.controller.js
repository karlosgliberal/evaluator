import { assign } from 'lodash';

export default class RegisterController {
  /*@ngInject*/
  constructor($scope, $ionicSideMenuDelegate, $timeout, $ionicPopup, $translate, $state, userRepository) {
    assign(this, {$scope, $ionicSideMenuDelegate, $timeout, $ionicPopup, $translate, $state, userRepository});

    this.setUpSideMenu();

    this.showLoadingIcon = false;
    this.showErrorText = false;
    this.fields = {
      name: '',
      surname: '',
      company: '',
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
        .register(this.fields)
        .then(() => {
          this.showLoadingIcon = false;
          this.showEmailPopup();
        })
        .catch(error => {
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

  showEmailPopup() {
    this.$ionicPopup
      .alert({
        title: this.$translate.instant('login.email_confirmation')
      })
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
