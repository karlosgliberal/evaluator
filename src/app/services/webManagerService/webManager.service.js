import {assign} from 'lodash';

export default class webManagerService {
  /*@ngInject*/
  constructor(apiUrl, $http, $window) {
    assign(this, {apiUrl, $http, $window});
  };


  sendDataDrupal(result) {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var jsonResult = JSON.stringify(result);
    return this.$http.post('https://www.olmix.com/evaluator/process', result, config)
      .then(
        function (response) {
          return response;
        },
        function (response) {
          return response;
        }
    );
  }

  prepareSendLocalStorage(claves){
    let valorCola = Number(this.$window.localStorage.getItem('cola'));
    if (valorCola === 1){
      for (var i = 0; i < claves.length; i++){
        let data = this.$window.localStorage.getItem(claves[i]);
        let dataString = JSON.parse(data);
        this.$window.localStorage.setItem('cola', 0);
        this.sendDataLocalStorage(data, claves[i]);
      }
    }
  }

  sendDataLocalStorage(data, key){
    var requestResult = this.sendDataDrupal(data);
    requestResult.then((request) => {
      console.log('Conexion enviado');
      this.$window.localStorage.removeItem(key);
    }, (error) => {
      this.saveData(resultado);
      console.log('Error envio');
      return {result: 'error', error: 'server'};
    });
  }
}
