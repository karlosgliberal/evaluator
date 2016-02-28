import userDetailConfig from './userDetail.config.js';
import userDetailControllers from './userDetail.controllers.js';

const userDetailModule = angular
    .module('olmixEvaluator.userDetail', [
      userDetailControllers.name
    ])
    .config(userDetailConfig);

export default userDetailModule;
