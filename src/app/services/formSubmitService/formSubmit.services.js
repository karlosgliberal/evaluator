import formSubmitService from './formSubmitService';
import animalFieldsManager from '../animalFieldsManagerService/animalFieldsManager.services';
import localStorageManager from '../localStorageManagerService/localStorageManager.services';

export default angular
    .module('olmixEvaluator.formSubmit.services', [animalFieldsManager.name, localStorageManager.name])
    .service('formSubmitService', formSubmitService);

