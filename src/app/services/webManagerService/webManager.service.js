import {assign} from 'lodash';


export default class webManagerService {
  /*@ngInject*/
  constructor(apiUrl, $http) {
    assign(this, {apiUrl, $http});
  };


  sendDataDrupal(animal, result, email) {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(result);
    var jsonResult = JSON.stringify(result);
    console.log(jsonResult);

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
