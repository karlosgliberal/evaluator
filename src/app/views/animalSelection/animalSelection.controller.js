import { assign } from 'lodash';
import language from '../../utils/language';
import animal from '../../utils/animal';
import './images/poultry.png';
import './images/swine.png';
import './images/vaca.png';
import './images/logo-cabecera.png';

const imagePathBase = './assets/images/';

export default class AnimalSelectionController {
  /*@ngInject*/
  constructor($state, $translate, $window) {
    assign(this, {$state, $translate, $window});

    this.animals = this.availableAnimals();
    this.dimensionHeight = this.calculateDimensionHeight();
    this.logoIcon = './assets/images/logo-cabecera.png';
  }

  calculateDimensionHeight(gesture) {
    return this.$window.innerHeight;
  }

  availableAnimals() {
    var availableAnimals = [{name: animal.COW, path: imagePathBase + 'vaca.png'}, {
      name: animal.POULTRY,
      path: imagePathBase + 'poultry.png'
    }];
    if (this.$translate.use() !== language.TURKISH) {
      availableAnimals.push({name: animal.SWINE, path: imagePathBase + 'swine.png'});
    }
    return availableAnimals;
  }

  onAnimalSelection(selectedAnimal) {
    console.log(selectedAnimal);
    this.$state.go('form', {animal: selectedAnimal});
  }
}
