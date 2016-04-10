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
}
