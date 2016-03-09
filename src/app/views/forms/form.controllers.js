import 'angular-formly-templates-ionic';
import 'angular-formly/dist/formly';

import formController from './form.controller.js';

export default angular
    .module('olmixEvaluator.form.controllers', ['formly', 'formlyIonic'])
    .controller('formController', formController);
