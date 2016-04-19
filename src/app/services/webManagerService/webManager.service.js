import {assign} from 'lodash';


export default class webManagerService {
  /*@ngInject*/
  constructor(apiUrl, $http) {
    assign(this, {apiUrl, $http});
  };


  sendDataDrupal() {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var movida = {movida: 'movida'};

    return this.$http.post('http://dev-olmix.pantheon.io/evaluator/process', movida, config)
      .then(
        function (response) {
          return response;
        },
        function (response) {
          return response;
        }
    );
  }

  movida(request){
    console.log(request);
  }
}
