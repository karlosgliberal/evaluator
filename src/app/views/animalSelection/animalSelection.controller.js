import { assign } from 'lodash';
import language from '../../utils/language';
import animals from '../../utils/animal';
import './images/poultry.png';
import './images/swine.png';
import './images/vaca.png';

const imagePathBase = './assets/images/';

export default class AnimalSelectionController {
  /*@ngInject*/
  constructor($state, $translate, $window, localStorageManager, networkManagerService, webManagerService) {
    assign(this, {$state, $translate, $window, localStorageManager, networkManagerService, webManagerService});
    this.animals = this.availableAnimals();
    this.dimensionHeight = this.calculateDimensionHeight() + 5;
    this.logoIcon = './assets/images/logo-cabecera.png';

    var userLanguage = this.localStorageManager.getDataFor('language');

    if (userLanguage) {
      userLanguage = userLanguage.replace(/(^\")|("$)/gi, '');
      this.$translate.use(userLanguage);
      this.$translate.refresh(userLanguage);
    }

  }

  calculateDimensionHeight(gesture) {
    if (ionic.Platform.isIOS()){
      if (this.$window.screen.height > this.$window.screen.width && (this.$window.orientation !== '90' || this.$window.orientation !== '-90')){
        return this.$window.screen.width;
      } else {
        return this.$window.screen.height;
      }
    } else {
      return this.$window.innerHeight;
    }
  }

  availableAnimals() {
    var claves = this.localStorageManager.getAllDataKeys();
    if (claves.length !== 0 && this.networkManagerService.isOnline()){
      this.webManagerService.prepareSendLocalStorage(claves);
    }
    var net = this.networkManagerService.startWatching();
    var availableAnimals = [{text: 'animal.cow', name: animals.COW, path: imagePathBase + 'vaca.png'}, {
      text: 'animal.poultry',
      name: animals.POULTRY,
      path: imagePathBase + 'poultry.png'
    }];
    if (this.$translate.use() !== language.TURKISH) {
      availableAnimals.push({text: 'animal.swine', name: animals.SWINE, path: imagePathBase + 'swine.png'});
    }
    return availableAnimals;
  }

  onAnimalSelection(selectedAnimal) {
    this.$state.go('form', {animal: selectedAnimal});
  }
}
