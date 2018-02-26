import {assign} from 'lodash';


export default class networkManagerService {
  /*@ngInject*/
  constructor($cordovaNetwork, $rootScope, $window, localStorageManager, webManagerService) {
    assign(this, {$cordovaNetwork, $rootScope, $window, localStorageManager, webManagerService});
  };

  isOnline() {
    if (ionic.Platform.isWebView()) {
      return this.$cordovaNetwork.isOnline();
    } else {
      return this.$window.navigator.onLine;
    }
  }

  isOffline() {
    if (ionic.Platform.isWebView()) {
      return !this.$cordovaNetwork.isOnline();
    } else {
      return !this.$window.navigator.onLine;
    }
  }

  startWatching() {
    const webManagerService = this.webManagerService;
    const localStorage = this.localStorageManager;

    if (ionic.Platform.isWebView()) {
      this.$rootScope.$on('$cordovaNetwork:online', (event, networkState) => {
        console.log('Estas online');
        const storageKeys = localStorage.getAllDataKeys();
        if (storageKeys.length !== 0) {
          webManagerService.prepareSendLocalStorage(storageKeys);
        }
      });
      this.$rootScope.$on('$cordovaNetwork:offline', (event, networkState) => {
        console.log('Estas offline cordova');
      });

    } else {
      this.$window.addEventListener('online', e => {
        console.log('Estas online');
        const storageKeys = localStorage.getAllDataKeys();
        if (storageKeys.length !== 0 && this.$cordovaNetwork.isOnline()) {
          webManagerService.prepareSendLocalStorage(storageKeys);
        }
      }, false);

      this.$window.addEventListener('offline', e => {
        console.log('estas offline');
      }, false);
    }
  }

}
