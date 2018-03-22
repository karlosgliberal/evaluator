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

    if (email === 'mikel@540deg.com' && password === 'olmix' || email === 'asucunza@olmix.com' && password === 'olmix') {
      return Promise.resolve({email: email, isOlmixUser: true});
    }

    return Promise.reject(new Error('invalid'));
    // return this.$http
    //   .post('/api/login', {email: email, password: password}, requestConfig)
    //   .then(response => response.data);
  }
}
