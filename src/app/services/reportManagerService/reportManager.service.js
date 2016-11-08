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
      let resultadoString = JSON.stringify(resultado);
      let requestResult = this.webManagerService.sendDataDrupal(resultadoString);
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
    //this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(result));
    this.localStorageManager.save('cola', 1);
    this.localStorageManager.save('Evaluation-' + Date.now(), result);
  }
}
