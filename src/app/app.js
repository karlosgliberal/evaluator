import 'angular/angular';
import 'angular-animate/angular-animate';
import 'angular-formly-templates-ionic';
import 'angular-messages/angular-messages.js';
import 'angular-sanitize/angular-sanitize';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-static-files';
import 'ionic-sdk/release/js/angular-ui/angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

// import ngCordova
import 'ng-cordova';
import 'angular-formly/dist/formly';

import appRun from './app.run';
import appConfig from './app.config';
import appController from './app.controller';
import appDirectives from './app.directives';

import idiomaModule from './views/idiomas/idioma.module';
import userFormModule from './views/userForm/userForm.module';
import seleccionAnimalModule from './views/seleccionAnimal/seleccionAnimal.module';

const appModule = angular
  .module('olmixEvaluator', [
    'ionic',
    'ngCordova',
    'pascalprecht.translate',
    'ngMessages',
    'formly',
    'formlyIonic',
    // high level app directives
    appDirectives.name,
    // // high level app services
    // all other application modules will be imported here
    idiomaModule.name,
    userFormModule.name,
    seleccionAnimalModule.name
  ])
    .config(appConfig)
    .controller('AppController', appController)
    .run(appRun);

export default appModule;
