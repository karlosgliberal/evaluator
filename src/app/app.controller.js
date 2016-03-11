import { assign } from 'lodash';

export default class AppController {
  /*@ngInject*/
  constructor($state) {
    assign(this, {$state});
    this.text = 'Bienvenidos a Olmix Evaluator';
    this.user = {
      name: 'Dave Ackerman',
      email: 'dave@dude.com'
    };
  }

  onSeleccionAnimalTap() {
    this.$state.go('seleccionAnimal');
  }

  onFormTap() {
    this.$state.go('form');
  }
}
