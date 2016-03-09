import formConfig from './form.config.js';
import formControllers from './form.controllers.js';
import formServices from './form.services.js';

const formModule = angular
    .module('olmixEvaluator.form', [
      formControllers.name,
      formServices.name
    ])
    .config(formConfig);

export default formModule;
