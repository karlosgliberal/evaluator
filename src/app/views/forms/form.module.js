import formConfig from './form.config.js';
import formControllers from './form.controllers.js';
import formServices from './../../services/formService/form.services.js';
import cowFormServices from './../../services/AnimalFormsServices/cow/cowForm.services.js';

const formModule = angular
    .module('olmixEvaluator.form', [
      formControllers.name,
      formServices.name
    ])
    .config(formConfig);

export default formModule;
