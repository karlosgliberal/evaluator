import 'angular/angular';
import 'angular-animate/angular-animate';
import 'angular-messages/angular-messages.js';
import 'angular-sanitize/angular-sanitize';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-static-files';
import 'ionic-sdk/release/js/angular-ui/angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

// import ngCordova
import 'ng-cordova';

import appRun from './app.run';
import appConfig from './app.config';
import appController from './app.controller';
import appDirectives from './app.directives';
import appServices from './app.services';

// basically, import aboutModule.name
import aboutModule from './views/about/about.module';
import idiomaModule from './views/idiomas/idioma.module';
import userFormModule from './views/userForm/userForm.module';
import userDetailModule from './views/userDetail/userDetail.module';

const appModule = angular
    .module('olmixEvaluator', [

        // include ionic, and angular
        'ionic',
        'ngCordova',
        'pascalprecht.translate',
        'ngMessages',

        // high level app directives
        appDirectives.name,

        // high level app services
        appServices.name,

        // all other application modules will be imported here
        aboutModule.name,
        idiomaModule.name,
        userDetailModule.name,
        userFormModule.name
    ])
    .config(appConfig)
    .controller('AppController', appController)
    .run(appRun)

export default appModule;
