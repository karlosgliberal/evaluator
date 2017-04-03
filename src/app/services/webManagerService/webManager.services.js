import webManagerService from './webManager.service';


export default angular
    .module('olmixEvaluator.webkManager.services', [])
    .constant('apiUrl', 'https://www.olmix.com')
    .service('webManagerService', webManagerService);
