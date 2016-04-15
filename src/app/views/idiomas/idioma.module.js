import idiomaRun from './idioma.run';
import idiomaConfig from './idioma.config';
import idiomaControllers from './idioma.controllers';
import formServices from './../../services/formService/form.services.js';

const idiomaModule = angular
    .module('olmixEvaluator.idioma', [
      idiomaControllers.name,
      'pascalprecht.translate',
      formServices.name
    ])
    .run(idiomaRun)
    .config(idiomaConfig);

export default idiomaModule;
