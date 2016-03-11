import formService from './formService';
import cowFormService from './../AnimalFormsServices/cowForm.services.js';

export default angular
    .module('olmixEvaluator.form.services', [cowFormService.name])
    .service('formService', formService);
