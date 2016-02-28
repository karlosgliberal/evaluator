import idiomaRun from './idioma.run';
import idiomaConfig from './idioma.config';
import idiomaControllers from './idioma.controllers';

const idiomaModule = angular
    .module('olmixEvaluator.idioma', [
      idiomaControllers.name
    ])
    .run(idiomaRun)
    .config(idiomaConfig);

export default idiomaModule;
