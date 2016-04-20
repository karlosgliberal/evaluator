import reportManagerService from './reportManager.service';
import networkManagerService from './../networkManagerService/networkManager.services';
import webManagerService from './../webManagerService/webManager.services';
import localStorageManagerService from './../localStorageManagerService/localStorageManager.services';

export default angular
    .module('olmixEvaluator.reportManager.services', [
      networkManagerService.name,
      webManagerService.name,
      localStorageManagerService.name
    ])
    .service('reportManagerService', reportManagerService);
