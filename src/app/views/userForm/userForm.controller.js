import { assign } from 'lodash';

export default class UserFormController {
    /*@ngInject*/
    constructor($scope, $state) {
        assign(this, {
            $scope,
            $state
        });
    }

    signIn(form){
        console.log(form);
        if(form.$valid) {
            this.$state.go('home');
        }
    };
}
