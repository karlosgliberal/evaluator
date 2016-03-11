import { assign } from 'lodash';

export default class SeleccionAnimalController {
  /*@ngInject*/
  constructor($state) {
    assign(this, {$state});
  }

  onAnimalSelection(animal) {
    this.$state.go('form', {animal: animal});
  }
}
