import { assign } from 'lodash';
import '../assets/images/msplash.png';

export default class AppController {
  /*@ngInject*/
  constructor($state, localStorageManager, $timeout) {
    assign(this, {$state, localStorageManager, $timeout});

    var language = this.localStorageManager.getDataFor('language');
    this.splash = './assets/images/msplash.png';

    this.$timeout(() => {
      this.goToNextScreen(language);
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
