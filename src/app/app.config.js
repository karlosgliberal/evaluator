import appTemplate from './app.html';

/*@ngInject*/
const AppConfig = ($stateProvider, $urlRouterProvider, $translateProvider) => {
  $stateProvider.state('home', {
    url: '/',
    template: appTemplate,
    controller: 'AppController',
    controllerAs: 'app',
    cache: false
  });
  $translateProvider
      .useStaticFilesLoader({
        prefix: 'assets/locales/',
        suffix: '.json'
      })
       .registerAvailableLanguageKeys(['br', 'de', 'en', 'en2', 'es', 'fr', 'hu', 'it', 'nl', 'pl', 'ru', 'tr', 'vn', 'zh'], {
         br: 'br',
         de: 'de',
         en: 'en',
         en2: 'en2',
         es: 'es',
         fr: 'fr',
         hu: 'hu',
         it: 'it',
         nl: 'nl',
         pl: 'pl',
         ru: 'ru',
         tr: 'tr',
         vn: 'vn',
         zh: 'zh'
       })
      .preferredLanguage('en2')
      .fallbackLanguage('en2')
      .forceAsyncReload(true)
      .useSanitizeValueStrategy('sanitizeParameters');
  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
