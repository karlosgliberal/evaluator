import seleccionAnimalRun from './seleccionAnimal.run';
import seleccionAnimalConfig from './seleccionAnimal.config';
import seleccionAnimalControllers from './seleccionAnimal.controllers';

const SeleccionAnimalModule = angular
    .module('olmixEvaluator.seleccionAnimal', [
      seleccionAnimalControllers.name
    ])
    .run(seleccionAnimalRun)
    .config(seleccionAnimalConfig);

export default SeleccionAnimalModule;
