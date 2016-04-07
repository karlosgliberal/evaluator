import animalSelectionRun from './animalSelection.run';
import animalSelectionConfig from './animalSelection.config';
import animalSelectionControllers from './animalSelection.controllers';

const AnimalSelectionModule = angular
    .module('olmixEvaluator.animalSelection', [
      animalSelectionControllers.name
    ])
    .run(animalSelectionRun)
    .config(animalSelectionConfig);

export default AnimalSelectionModule;
