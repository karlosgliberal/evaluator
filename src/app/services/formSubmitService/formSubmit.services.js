import formSubmitService from './formSubmitService';
import animalFieldsManager from '../animalFieldsManagerService/animalFieldsManager.services';
import localStorageManager from '../localStorageManagerService/localStorageManager.services';
import resultManager from '../resultManagerService/resultManager.services';
import networkManagerService from './../networkManagerService/networkManager.services';

export default angular
    .module('olmixEvaluator.formSubmit.services', [
      animalFieldsManager.name,
      localStorageManager.name,
      networkManagerService.name,
      resultManager.name
    ])
    .service('formSubmitService', formSubmitService);

