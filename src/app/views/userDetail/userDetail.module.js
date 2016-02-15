import userDetailConfig from './userDetail.config.js';
import userDetailControllers from './userDetail.controllers.js';
import userService from './../../services/userService/userService';

const userDetailModule = angular
    .module('olmixEvaluator.userDetail', [
        userDetailControllers.name
    ])
    .service('userService', userService)
    .config(userDetailConfig);

export default userDetailModule;
