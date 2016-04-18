import {assign} from 'lodash';
import languages from '../../utils/language';


export default class networkManagerService {
  /*@ngInject*/
  constructor($cordovaNetwork, $rootScope) {
    assign(this, {$cordovaNetwork, $rootScope});
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
    if (ionic.Platform.isWebView()) {
      this.$rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        console.log('Estas online');
      });
      this.$rootScope.$on('$cordovaNetwork:offline', function (event, networkState){
        console.log('Estas offline');
      });

    } else {
      window.addEventListener('online', function (e) {
        console.log('Estas online');
      }, false);

      window.addEventListener('offline', function (e) {
        console.log('estas offline');
      }, false);
    }
  }

}
