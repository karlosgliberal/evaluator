import languageFormService from './languageForm.service';
import formServices from './../formService/form.services';

export default angular
    .module('olmixEvaluator.languageForm.services', [formServices.name])
    .service('languageFormService', languageFormService);
