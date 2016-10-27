import {assign} from 'lodash';


export default class reportManagerService {
  /*@ngInject*/
  constructor(networkManagerService, webManagerService, localStorageManager) {
    assign(this, {networkManagerService, webManagerService, localStorageManager});
  };

  sendReport(animal, result, email) {
    var resultado = result;
    resultado.email = email;
    var net = this.networkManagerService.startWatching();
    var network = this.networkManagerService.isOnline();
    if (network) {
      var requestResult = this.webManagerService.sendDataDrupal(resultado);
      requestResult.then((request) => {
        console.log('Conexion enviado');
      }, (error) => {
        this.saveData(resultado);
        console.log('Error envio');
        return {result: 'error', error: 'server'};
      });
    } else {
      console.log('Sin conexion');
      this.saveData(resultado);

      return {result: 'error', error: 'internet'};
    }
    return {result: 'ok'};
  }

  saveData(result) {
    this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(result));
  }
}
