import { assign } from 'lodash';

export default class UserService {
  /*@ngInject*/
  constructor(apiUrl, $http, $window) {
    assign(this, {apiUrl, $http, $window});
  }

 /**
  * Returns all of our Users
  * @return {Promise}
  */
  getUsers() {
    this.users = this.$http.get(`${this.apiUrl}/users`);
    return this.users;
  }

  saveUsers(users) {
    this.$window.localStorage.setItem('users', JSON.stringify(users));
  }

  findUser(name) {
    var users = JSON.parse(this.$window.localStorage.getItem('users') || '{}');

    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        return users[i]; // Return as soon as the object is found
      }
    }

    return;
  }
}
