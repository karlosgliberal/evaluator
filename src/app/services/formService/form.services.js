import formService from './formService';
import cowFormService from './../AnimalFormsServices/cow/cowForm.services';
import swineFormService from './../AnimalFormsServices/swine/swineForm.services';
import poultryFormService from './../AnimalFormsServices/poultry/poultryForm.services';

export default angular
    .module('olmixEvaluator.form.services', [cowFormService.name, swineFormService.name, poultryFormService.name])
    .service('formService', formService);
