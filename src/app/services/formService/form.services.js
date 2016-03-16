import formService from './formService';
import cowFormService from './../AnimalFormsServices/cow/cowForm.services.js';
import swineFormService from './../AnimalFormsServices/swine/swineForm.services';

export default angular
    .module('olmixEvaluator.form.services', [cowFormService.name, swineFormService.name])
    .service('formService', formService);
