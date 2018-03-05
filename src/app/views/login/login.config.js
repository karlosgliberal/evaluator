import loginTemplate from './login.html';

/*@ngInject*/
const LoginConfig = ($stateProvider) => {
  $stateProvider.state('login', {
    url: '/login',
    template: loginTemplate,
    controller: 'LoginController as login',
  });
};

export default LoginConfig;
