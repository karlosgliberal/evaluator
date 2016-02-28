import userFormConfig from './userForm.config.js';
import userFormControllers from './userForm.controllers.js';
import userFormService from './userForm.services.js';

const userFormModule = angular
    .module('olmixEvaluator.userForm', [
      userFormControllers.name,
      userFormService.name
    ])
    .config(userFormConfig);

export default userFormModule;
