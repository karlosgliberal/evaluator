import poultryFormService from './poultryFormService';
import formPartsBuilderServices from '../../formPartsBuilderService/formPartsBuilder.services';

export default angular
    .module('olmixEvaluator.poultryForm.services', [formPartsBuilderServices.name])
    .service('poultryFormService', poultryFormService);
