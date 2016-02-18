import userFormConfig from './userForm.config.js';
import userFormControllers from './userForm.controllers.js';

const userFormModule = angular
    .module('olmixEvaluator.userDetail', [
        userFormControllers.name
    ])
    .config(userFormConfig);

export default userFormModule;
