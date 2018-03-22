import appTemplate from './app.html';

/*@ngInject*/
const AppConfig = ($stateProvider, $urlRouterProvider, $translateProvider, $qProvider) => {
  $stateProvider.state('home', {
    url: '/',
    template: appTemplate,
    controller: 'AppController as app',
    cache: false
  });
  $qProvider.errorOnUnhandledRejections(false);
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'assets/locales/',
      suffix: '.json'
    })
    .registerAvailableLanguageKeys(['br', 'de', 'en', 'es', 'fr', 'hu', 'it', 'nl', 'pl', 'ru', 'tr', 'vn', 'zh'], {
      br: 'br',
      de: 'de',
      en: 'en',
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
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .forceAsyncReload(true)
    .useSanitizeValueStrategy('sanitizeParameters');
  $urlRouterProvider.otherwise('/');
};

export default AppConfig;
