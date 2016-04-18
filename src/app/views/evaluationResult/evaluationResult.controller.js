import { assign } from 'lodash';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, networkManagerService, $rootScope) {
    assign(this, {
      $stateParams,
      networkManagerService,
      $rootScope
    });
    networkManagerService.startWatching();
    console.log(networkManagerService.isOnline());
//     this.network = $c  ordovaNetwork.getNetwork();
//     this.isOnline = $cordovaNetwork.isOnline();
//     //this.$apply();
//
//     $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
//       console.log(Online);
//       this.isOnline = true;
//       this.network = $cordovaNetwork.getNetwork();
//       console.log(this.network);
//     });
//
// // listen for Offline event
//     $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
//       console.log('got offline');
//       this.isOnline = false;
//       this.network = $cordovaNetwork.getNetwork();
//     });
  }
}
