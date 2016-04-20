import {assign} from 'lodash';


export default class reportManagerService {
  /*@ngInject*/
  constructor(networkManagerService, webManagerService, localStorageManager) {
    assign(this, {networkManagerService, webManagerService, localStorageManager});
  };

  sendReport(animal, result, email) {
    var network = this.networkManagerService.isOnline();
    if (network) {
      var requestResult = this.webManagerService.sendDataDrupal(animal, result, email);
      requestResult.then((request) => {
      }, (error) => {
        this.saveData(animal, result, email);
        return {result: 'error', error: 'server'};
      });
    } else {
      this.saveData(animal, result, email);

      return {result: 'error', error: 'internet'};
    }
    return {result: 'ok'};
  }

  saveData(animal, result, email) {
    var data = {};
    _.assign(data, {animal: animal}, {result: result}, {email: email});

    this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(data));
  }
}
