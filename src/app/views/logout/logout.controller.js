import {assign} from 'lodash';

export default class LogoutController {
  /*@ngInject*/
  constructor($translate, $state, localStorageManager, popupManager) {
    assign(this, {$translate, $state, localStorageManager, popupManager});
  }

  prompt() {
    return this.popupManager
      .prompt('logout.question', 'logout.ok', 'logout.cancel')
      .then(confirmed => {
        if (confirmed) {
          this.removeDataFromLocalStorage();
          this.$state.go('login');
        }
      });
  }

  removeDataFromLocalStorage() {
    return this.localStorageManager.removeAll();
  }
}
