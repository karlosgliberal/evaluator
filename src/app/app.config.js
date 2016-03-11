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
        en: 'en', es: 'es'
      })
      .preferredLanguage('es')
      .fallbackLanguage('es')
      .determinePreferredLanguage('es')
      .useSanitizeValueStrategy('sanitizeParameters');

  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
