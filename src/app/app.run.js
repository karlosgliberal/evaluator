/*@ngInject*/
const AppRun = ($ionicPlatform, $cordovaStatusbar, $cordovaKeyboard, $rootScope, $ionicLoading, $cordovaSplashscreen, $cordovaNetwork) => {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      $cordovaKeyboard.hideAccessoryBar(true);
      $cordovaKeyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      $cordovaStatusbar.style(1);
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function () {
    console.log('show');
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-energized"></ion-spinner>'
    });
  });

  $rootScope.$on('loading:hide', function () {
    $ionicLoading.hide();
  });

  $rootScope.$on('$stateChangeStart', function () {
    console.log('please wait...');
    $rootScope.$broadcast('loading:show');
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    console.log('done');
    $rootScope.$broadcast('loading:hide');
  });

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {
      console.log('error state change:', error);
      $rootScope.$broadcast('loading:hide');
    }
  );
};

export default AppRun;
