import { assign } from 'lodash';

export default class UserDetailController {
  /*@ngInject*/
  constructor($scope, $stateParams, userService) {
    assign(this, {
      $scope,
      $stateParams,
      userService
    });

    this.userDetail = this.userService.findUser($stateParams.user);
  }
}
