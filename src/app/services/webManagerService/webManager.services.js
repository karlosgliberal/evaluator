import webManagerService from './webManager.service';


export default angular
    .module('olmixEvaluator.webkManager.services', [])
    .constant('apiUrl', 'http://dev-olmix.pantheon.io')
    .service('webManagerService', webManagerService);
