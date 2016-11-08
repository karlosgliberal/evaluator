import {assign} from 'lodash';
import languages from '../../utils/language';


export default class networkManagerService {
  /*@ngInject*/
  constructor($cordovaNetwork, $rootScope, localStorageManager, webManagerService) {
    assign(this, {$cordovaNetwork, $rootScope, localStorageManager, webManagerService});

  };

  isOnline(){
    if (ionic.Platform.isWebView()) {
      return this.$cordovaNetwork.isOnline();
    } else {
      return navigator.onLine;
    }
  }

  isOffline(){
    if (ionic.Platform.isWebView()) {
      return !this.$cordovaNetwork.isOnline();
    } else {
      return !navigator.onLine;
    }
  }

  startWatching(){
    var webManagerService = this.webManagerService;
    var localStorage = this.localStorageManager;
    var $cordovaNetwork = this.$cordovaNetwork;
    if (ionic.Platform.isWebView()) {
      this.$rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        console.log('Estas online');
        var claves = localStorage.getAllDataKeys();
        if (claves.length !== 0){
          webManagerService.prepareSendLocalStorage(claves);
        }
      });
      this.$rootScope.$on('$cordovaNetwork:offline', function (event, networkState){
        console.log('Estas offline cordova');
      });

    } else {
      window.addEventListener('online', function (e) {
        console.log('Estas online');
        var claves = localStorage.getAllDataKeys();
        if (claves.length !== 0 && this.$cordovaNetwork.isOnline()){
          webManagerService.prepareSendLocalStorage(claves);
        }
      }, false);

      window.addEventListener('offline', function (e) {
        console.log('estas offline');
      }, false);
    }
  }

}
