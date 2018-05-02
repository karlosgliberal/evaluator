import { assign, clone } from 'lodash';

const requestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export default class userRepository {
  /*@ngInject*/
  constructor($http, networkManagerService, localStorageManager){
    assign(this, {$http, networkManagerService, localStorageManager});
  };

  login(email, password) {
    this.networkManagerService.startWatching();
    if (this.networkManagerService.isOffline()) {
      return Promise.reject(new Error('internet'));
    }

    return this.$http
      .post('/api/login', {email: email, password: password}, requestConfig)
      .then(response => response.data);
  }

  register(registerFields) {
    this.networkManagerService.startWatching();
    if (this.networkManagerService.isOffline()) {
      return Promise.reject(new Error('internet'));
    }

    const payload = this.getPayloadWithLocale(registerFields);

    return this.$http
      .post('/api/register', payload, requestConfig)
      .then(response => response.data);
  }

  getPayloadWithLocale(registerFields) {
    const payload = clone(registerFields);
    payload.locale = JSON.parse(this.localStorageManager.getDataFor('language'));

    return payload;
  }
}
