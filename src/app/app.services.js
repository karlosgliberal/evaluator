import userService from './services/userService/userService';

export default angular
    .module('olmixEvaluator.services', [])
    .constant('apiUrl', 'http://demo8156226.mockable.io')
    .service('userService', userService)
