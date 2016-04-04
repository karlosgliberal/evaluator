import formSubmitService from './formSubmitService';
import animalFieldsManager from '../animalFieldsManagerService/animalFieldsManager.services';

export default angular
    .module('olmixEvaluator.formSubmit.services', [animalFieldsManager.name])
    .service('formSubmitService', formSubmitService);
