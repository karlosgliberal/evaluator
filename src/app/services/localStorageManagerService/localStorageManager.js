import {assign} from 'lodash';

const languageKey = 'language';

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

  remove(key) {
    this.$window.localStorage.removeItem(key);
  }

  clearSession() {
    const valueToKeep = JSON.parse(this.getDataFor(languageKey));

    this.$window.localStorage.clear();

    this.save(languageKey, valueToKeep);
  }

  getAllDataKeys(){
    let keys = [];
    for (let i = 0; i < this.$window.localStorage.length; i++){
      if (this.$window.localStorage.key(i) !== 'language' || this.$window.localStorage.key(i) !== 'cola'){
        keys.push(this.$window.localStorage.key(i));
      }
    }
    return keys;
  }
}
