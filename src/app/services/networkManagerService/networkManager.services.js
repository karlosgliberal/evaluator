import networkManagerService from './networkManager.service';
import localStorageManagerService from './../localStorageManagerService/localStorageManager.services';
import webManagerService from './../webManagerService/webManager.services';


export default angular
    .module('olmixEvaluator.networkManager.services', [
      webManagerService.name,
      localStorageManagerService.name
    ])
    .service('networkManagerService', networkManagerService);
