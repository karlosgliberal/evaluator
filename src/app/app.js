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
import contactModule from './views/contact/contact.module';
import formModule from './views/forms/form.module';
import animalSelectionModule from './views/animalSelection/animalSelection.module';
import evaluationResultModule from './views/evaluationResult/evaluationResult.module';
import loginModule from './views/login/login.module';
import registerModule from './views/register/register.module';
import logoutModule from './views/logout/logout.module';
import localStorageManagerService from './services/localStorageManagerService/localStorageManager.services';
import userRepositoryService from './services/userRepositoryService/userRepository.services';
import poupManagerService from './services/popupManagerService/popupManager.services';

const appModule = angular
    .module('olmixEvaluator', [
      'ionic',
      'ngCordova',
      'pascalprecht.translate',
      appDirectives.name,
      idiomaModule.name,
      formModule.name,
      animalSelectionModule.name,
      contactModule.name,
      evaluationResultModule.name,
      localStorageManagerService.name,
      loginModule.name,
      registerModule.name,
      logoutModule.name,
      userRepositoryService.name,
      poupManagerService.name
    ])
    .config(appConfig)
    .controller('AppController', appController)
    .run(appRun);

export default appModule;
