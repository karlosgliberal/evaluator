import languageFormService from './languageForm.service';
import formPartsBuilderServices from '../formPartsBuilderService/formPartsBuilder.services';
//import languageFormService from '../languageFormService/languageForm.services';
//import formServices from './../formService/form.services';

export default angular
    .module('olmixEvaluator.languageForm.services', [formPartsBuilderServices.name])
    .service('languageFormService', languageFormService);
