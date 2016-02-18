import userForm from './userForm.html';

/*@ngInject*/
const UserFormConfig = ($stateProvider) => {
    $stateProvider.state('userForm', {
        url: '/userForm',
        template: userForm,
        controller: 'UserFormController',
        controllerAs: 'userForm'
    })
};

export default UserFormConfig;
