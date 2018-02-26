import {assign} from 'lodash';


export default class reportManagerService {
  /*@ngInject*/
  constructor(networkManagerService, webManagerService, localStorageManager) {
    assign(this, {networkManagerService, webManagerService, localStorageManager});
  };

  sendReport(animal, result, email) {
    let report = result;
    report.email = email;
    this.networkManagerService.startWatching();
    let network = this.networkManagerService.isOnline();
    if (network) {
      let resultadoString = JSON.stringify(report);
      console.log('Drupal');
      console.log(resultadoString);
      this.webManagerService
        .sendDataDrupal(resultadoString)
        .then(request => {
          console.log('Conexion enviado');
        })
        .catch(error => {
          this.saveData(report);

          return {result: 'error', error: 'server'};
        });
    } else {
      console.log('Sin conexion');
      this.saveData(report);

      return {result: 'error', error: 'internet'};
    }

    return {result: 'ok'};
  }

  saveData(result) {
    //this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(result));
    this.localStorageManager.save('cola', 1);
    this.localStorageManager.save('Evaluation-' + Date.now(), result);
  }
}
