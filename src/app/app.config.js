import appTemplate from './app.html';


/*@ngInject*/
const AppConfig = ($stateProvider, $urlRouterProvider, $translateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        template: appTemplate,
        controller: 'AppController',
        controllerAs: 'app',
        cache: false,
        resolve: {
            users : function(userService, $stateParams){
              return userService.getUsers().then(response => {
                userService.saveUsers(response.data.users);
                return this.users = response.data.users;
              },
              (error) => {
                return this.error = 'something went wrong';
              });
            }

        }
    });
    $translateProvider
        .useStaticFilesLoader({
            prefix: 'assets/locales/',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'es'], {
            'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
            'es' : 'es'
        })
        .preferredLanguage('en')
        .fallbackLanguage('en')
        .determinePreferredLanguage()
        .useSanitizeValueStrategy('sanitize');

    $urlRouterProvider.otherwise('/');
};

export default AppConfig;
