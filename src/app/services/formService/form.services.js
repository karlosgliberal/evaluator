import formService from './formService';
import cowFormService from '../animalFormsServices/cow/cowForm.services';
import swineFormService from '../animalFormsServices/swine/swineForm.services';
import poultryFormService from '../animalFormsServices/poultry/poultryForm.services';

export default angular
    .module('olmixEvaluator.form.services', [cowFormService.name, swineFormService.name, poultryFormService.name])
    .service('formService', formService);
