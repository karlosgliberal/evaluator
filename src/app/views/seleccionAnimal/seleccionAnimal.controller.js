import { assign } from 'lodash';

export default class SeleccionAnimalController {
  /*@ngInject*/
  constructor($scope) {
    assign(this, {
      $scope,
      animales: [
        'Vacas',
        'Cerdos',
        'Gallinas'
      ]
    });
  }

  removeAnimales(animales) {
    this.animales.splice(this.animales.indexOf(animales), 1);
  }
}
