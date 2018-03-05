import { assign } from 'lodash';

export default class AppController {
  /*@ngInject*/
  constructor($state, $timeout, localStorageManager) {
    assign(this, {$state, $timeout, localStorageManager});

    const language = this.localStorageManager.getDataFor('language');
    this.$timeout(() => {
      this.goToNextScreen(language);
    }, 500);
  }

  goToNextScreen(language) {
    if (language) {
      this.$state.go('login');
    } else {
      this.$state.go('idioma');
    }
  }
}
