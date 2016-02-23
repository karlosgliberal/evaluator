import { assign } from 'lodash';

export default class AppController {
    /*@ngInject*/
    constructor($state, userService, $stateParams) {
      assign(this, {$state, userService});
      this.text = 'Bienvenidos a Olmix Evaluator';
      this.user = {
        name: 'Dave Ackerman',
        email: 'dave@dude.com'
      };
      console.log($stateParams);
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
