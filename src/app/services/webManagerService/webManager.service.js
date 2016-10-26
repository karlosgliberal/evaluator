import {assign} from 'lodash';


export default class webManagerService {
  /*@ngInject*/
  constructor(apiUrl, $http) {
    assign(this, {apiUrl, $http});
  };


  sendDataDrupal(result) {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var jsonResult = JSON.stringify(result);

    return this.$http.post('http://dev-olmix.pantheonsite.io/evaluator/process', jsonResult, config)
    //return this.$http.post('http://test.local:8081/evaluator/process', jsonResult, config)
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
    console.log('adminadminadminadmin');
    console.log(request);
  }
}
