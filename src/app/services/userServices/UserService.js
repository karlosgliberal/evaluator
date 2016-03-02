import { assign } from 'lodash';

export default class userService {
    /*@ngInject*/
    constructor(apiUrl, $http, $window) {
        assign(this, {apiUrl, $http, $window});
    }


    /**
     * Returns all of our Users
     * @return {Promise}
     */
    getUsers() {
        this.callUserWS().then(response => {
                this.saveUsers(response.data.users);
                this.users = response.data.users;
            },
            (error) => {
                return this.error = 'something went wrong';
            });

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

    callUserWS(){
        return this.users = this.$http.get(`${this.apiUrl}/users`);
    }
}
