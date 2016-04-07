import animalSelectionTemplate from './animalSelection.html';

/*@ngInject*/
const AnimalSelectionConfig = ($stateProvider) => {
  $stateProvider.state('animalSelection', {
    url: '/animalSelection',
    template: animalSelectionTemplate,
    controller: 'animalSelectionController',
    controllerAs: 'animalSelection'
  });
};

export default AnimalSelectionConfig;
