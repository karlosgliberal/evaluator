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
      .registerAvailableLanguageKeys(['es', 'en'], {
        en: 'en', es: 'es', tr: 'tr', ch: 'ch', vi: 'vi'
      })
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .determinePreferredLanguage('en')
      .useSanitizeValueStrategy('sanitizeParameters');

  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
