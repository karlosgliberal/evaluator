import idiomaRun from './idioma.run';
import idiomaConfig from './idioma.config';
import idiomaControllers from './idioma.controllers';
import languageFormServices from '../../services/languageFormService/languageForm.services.js';

const idiomaModule = angular
    .module('olmixEvaluator.idioma', [
      idiomaControllers.name,
      languageFormServices.name
    ])
    .run(idiomaRun)
    .config(idiomaConfig);

export default idiomaModule;
