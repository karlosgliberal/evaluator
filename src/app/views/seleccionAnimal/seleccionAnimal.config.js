import seleccionAnimalTemplate from './seleccionAnimal.html';

/*@ngInject*/
const SeleccionAnimalConfig = ($stateProvider) => {
  $stateProvider.state('seleccionAnimal', {
    url: '/seleccionAnimal',
    template: seleccionAnimalTemplate,
    controller: 'SeleccionAnimalController',
    controllerAs: 'seleccionAnimal'
  });
};

export default SeleccionAnimalConfig;
