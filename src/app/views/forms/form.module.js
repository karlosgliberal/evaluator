import formConfig from './form.config.js';
import formControllers from './form.controllers.js';
import formService from './form.services.js';

const formModule = angular
    .module('olmixEvaluator.form', [
      formControllers.name,
      formService.name
    ])
    .config(formConfig);

export default formModule;
