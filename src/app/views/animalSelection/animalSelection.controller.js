import { assign } from 'lodash';
import language from '../../utils/language';
import animal from '../../utils/animal';

const imagePathBase = './images/';

export default class AnimalSelectionController {
  /*@ngInject*/
  constructor($state, $translate) {
    assign(this, {$state, $translate});

    this.animals = this.availableAnimals();
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
    this.$state.go('form', {animal: selectedAnimal});
  }
}
