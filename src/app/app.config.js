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
       .registerAvailableLanguageKeys(['en', 'es', 'fr'], {
         en: 'en', es: 'es', fr: 'fr'
       })
      .preferredLanguage('en')
      //.fallbackLanguage('en')
      .forceAsyncReload(true)
      .useSanitizeValueStrategy('sanitizeParameters');
  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
