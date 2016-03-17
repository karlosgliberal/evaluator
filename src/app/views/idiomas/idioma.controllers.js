import 'angular-formly-templates-ionic';
import 'angular-formly/dist/formly';

import IdiomaController from './idioma.controller';

export default angular
    .module('olmixEvaluator.idioma.controllers', ['formly', 'formlyIonic'])
    .controller('IdiomaController', IdiomaController);
