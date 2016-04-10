import { assign } from 'lodash';

export default class AppController {
  /*@ngInject*/
  constructor($state, localStorageManager) {
    assign(this, {$state, localStorageManager});

    var language = this.localStorageManager.getDataFor('language');

    this.goToNextScreen(language);
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
