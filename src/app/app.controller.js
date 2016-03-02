import { assign } from 'lodash';

export default class AppController {
    /*@ngInject*/
    constructor($state, userService) {
      assign(this, {$state, userService});
      this.text = 'Bienvenidos a Olmix Evaluator';
      this.user = {
        name: 'Dave Ackerman',
        email: 'dave@dude.com'
      };
      this.userService.getUsers().then(response => {
        return this.users = response.data.users;
      },
      (error) => {
        return this.error = 'something went wrong';
      });
    }

    onAboutTap() {
      this.$state.go('about');
    }

    onFormTap() {
      this.$state.go('userForm');
    }

    onUserClick(name) {
      this.$state.go('userDetail', {user: name});
    }
}
