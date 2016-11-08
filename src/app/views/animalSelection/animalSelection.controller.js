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
  }

  calculateDimensionHeight(gesture) {
    return this.$window.innerHeight;
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
