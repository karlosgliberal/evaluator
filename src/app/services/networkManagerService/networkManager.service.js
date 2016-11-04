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
    if (ionic.Platform.isWebView()) {
      this.$rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        console.log('Estas online');
        var claves = localStorage.getAllDataKeys();
        console.log(claves);
      });
      this.$rootScope.$on('$cordovaNetwork:offline', function (event, networkState){
        console.log('Estas offline movida');
      });

    } else {
      window.addEventListener('online', function (e) {
        console.log('Estas online');
        console.log(localStorage);
        var claves = localStorage.getAllDataKeys();
      }, false);

      window.addEventListener('offline', function (e) {
        console.log('estas offline');
        // var text = 'language';
        // var dato = window.localStorage.getItem(text);
        // console.log(this.localStorageManager);
      }, false);
    }
  }

}
