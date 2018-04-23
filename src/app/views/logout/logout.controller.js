import {assign} from 'lodash';

const userStorageKey = 'user';

export default class LogoutController {
  /*@ngInject*/
  constructor($ionicPopup, $translate, $state, localStorageManager) {
    assign(this, {$ionicPopup, $translate, $state, localStorageManager});
  }

  prompt() {
    return this.$ionicPopup.confirm({
      title: this.$translate.instant('logout.question'),
      okText: this.$translate.instant('logout.ok'),
      cancelText: this.$translate.instant('logout.cancel')
    }).then(confirmed => {
      if (confirmed) {
        this.removeUserFromLocalStorage();
        this.$state.go('login');
      }
    });
  }

  removeUserFromLocalStorage() {
    return this.localStorageManager.remove(userStorageKey);
  }
}
