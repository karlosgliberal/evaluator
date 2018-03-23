import { assign } from 'lodash';

const requestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export default class userRepository {
  /*@ngInject*/
  constructor($http, networkManagerService){
    assign(this, {$http, networkManagerService});
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

    return this.$http
      .post('/api/register', registerFields, requestConfig)
      .then(response => response.data);
  }
}
