import { assign } from 'lodash';

export default class UserFormController {
    /*@ngInject*/
  constructor($scope, $state, userFormService) {
    assign(this, {
      $scope,
      $state,
      userFormService
    });
    this.rental = {};
    this.formFields = this.userFormService.getFormFields();
  }

  signIn(form) {
    console.log(form);
    if (form.$valid) {
      this.$state.go('home');
    }
  }
}
