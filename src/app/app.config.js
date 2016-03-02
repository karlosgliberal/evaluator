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
    .registerAvailableLanguageKeys(['en', 'es'], {
      en: 'en', enGB: 'en', enUS: 'en',
      es: 'es'
    })
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .determinePreferredLanguage()
    .useSanitizeValueStrategy('sanitize');

  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
