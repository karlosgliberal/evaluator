import {assign} from 'lodash';

export default class localStorageManager {
  /*@ngInject*/
  constructor($window) {
    assign(this, {$window});
  };

  save(key, data) {
    this.$window.localStorage.setItem(key, JSON.stringify(data));
  }

  getDataFor(key) {
    return this.$window.localStorage.getItem(key);
  }

  getAllDataKeys(){
    var claves = [];
    for (var i = 0; i < this.$window.localStorage.length; i++){
      if (this.$window.localStorage.key(i) !== 'language'){
        console.log(this.$window.localStorage.key(i));
        claves.push(this.$window.localStorage.key(i));
      }
    }
    return claves;
  }
}
