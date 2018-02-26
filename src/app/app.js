import 'angular/angular';
import 'angular-animate/angular-animate';
import 'angular-sanitize/angular-sanitize';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-static-files';
import 'ionic-sdk/release/js/angular-ui/angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';
import 'angular-translate-storage-local/angular-translate-storage-local';
import 'ng-cordova';

import appRun from './app.run';
import appConfig from './app.config';
import appController from './app.controller';
import appDirectives from './app.directives';
import idiomaModule from './views/idiomas/idioma.module';
import formModule from './views/forms/form.module';
import animalSelectionModule from './views/animalSelection/animalSelection.module';
import evaluationResultModule from './views/evaluationResult/evaluationResult.module';
import localStorageManagerService from './services/localStorageManagerService/localStorageManager.services';
import constantsService from './services/constants/constants.service';

const appModule = angular
    .module('olmixEvaluator', [
      'ionic',
      'ngCordova',
      'pascalprecht.translate',
      appDirectives.name,
      idiomaModule.name,
      formModule.name,
      animalSelectionModule.name,
      evaluationResultModule.name,
      localStorageManagerService.name,
      constantsService.name
    ])
    .config(appConfig)
    .controller('AppController', appController)
    .run(appRun);

export default appModule;
