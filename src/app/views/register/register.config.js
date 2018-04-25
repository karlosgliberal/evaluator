import registerTemplate from './register.html';

/*@ngInject*/
const RegisterConfig = ($stateProvider) => {
  $stateProvider.state('register', {
    url: '/register',
    template: registerTemplate,
    controller: 'RegisterController as register',
  });
};

export default RegisterConfig;
