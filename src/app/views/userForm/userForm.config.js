import userForm from './userForm.html';

/*@ngInject*/
const UserFormConfig = ($stateProvider, formlyConfigProvider) => {
    $stateProvider.state('userForm', {
        url: '/userForm',
        template: userForm,
        controller: 'UserFormController',
        controllerAs: 'userForm'
    });

    formlyConfigProvider.setType({
        name: 'custom',
        templateUrl: 'custom.html'
    });
};

export default UserFormConfig;
