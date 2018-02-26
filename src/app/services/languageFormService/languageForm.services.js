import languageFormService from './languageForm.service';
import formPartsBuilderServices from '../formPartsBuilderService/formPartsBuilder.services';

export default angular
    .module('olmixEvaluator.languageForm.services', [formPartsBuilderServices.name])
    .service('languageFormService', languageFormService);
