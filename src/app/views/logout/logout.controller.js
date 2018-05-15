import {assign} from 'lodash';

export default class LogoutController {
  /*@ngInject*/
  constructor($state, localStorageManager, popupManager) {
    assign(this, {$state, localStorageManager, popupManager});
  }

  prompt() {
    return this.popupManager
      .prompt('logout.question', 'logout.ok', 'logout.cancel')
      .then(confirmed => {
        if (confirmed) {
          this.localStorageManager.clearSession();
          this.$state.go('login');
        }
      });
  }
}
