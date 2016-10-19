import formSubmitService from './formSubmitService';
import animalFieldsManager from '../animalFieldsManagerService/animalFieldsManager.services';
import localStorageManager from '../localStorageManagerService/localStorageManager.services';
import resultManager from '../resultManagerService/resultManager.services';

export default angular
    .module('olmixEvaluator.formSubmit.services', [
      animalFieldsManager.name,
      localStorageManager.name,
      resultManager.name
    ])
    .service('formSubmitService', formSubmitService);

