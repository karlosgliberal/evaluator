import formService from './formService';
import cowFormService from '../animalFormsServices/cow/cowForm.services';
import swineFormService from '../animalFormsServices/swine/swineForm.services';
import poultryFormService from '../animalFormsServices/poultry/poultryForm.services';
import languageFormService from '../languageFormService/languageForm.services';

export default angular
    .module('olmixEvaluator.form.services', [
      cowFormService.name,
      swineFormService.name,
      poultryFormService.name,
      languageFormService.name
    ])
    .service('formService', formService);
