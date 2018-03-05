import idiomaRun from './idioma.run';
import idiomaConfig from './idioma.config';
import idiomaControllers from './idioma.controllers';
import localStorageManager from './../../services/localStorageManagerService/localStorageManager.services';
import languageFormService from './../../services/languageFormService/languageForm.services';

const idiomaModule = angular
    .module('olmixEvaluator.idioma', [
      idiomaControllers.name,
      'pascalprecht.translate',
      localStorageManager.name,
      languageFormService.name
    ])
    .run(idiomaRun)
    .config(idiomaConfig);

export default idiomaModule;
