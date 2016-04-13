import { assign } from 'lodash';

export default class AppController {
  /*@ngInject*/
  constructor($state, localStorageManager, $timeout) {
    assign(this, {$state, localStorageManager, $timeout});

    var language = this.localStorageManager.getDataFor('language');
    var that = this;
    this.$timeout(function () {
      that.goToNextScreen(language);
    }, 3000);
  }

  goToNextScreen(language) {
    if (language) {
      this.goToAnimalSelection();
    } else {
      this.goToLanguageSelection();
    }
  }

  goToLanguageSelection() {
    this.$state.go('idioma');
  }

  goToAnimalSelection() {
    this.$state.go('animalSelection');
  }
}
