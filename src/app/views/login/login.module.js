import loginRun from './login.run';
import loginConfig from './login.config';
import loginControllers from './login.controllers';

const LoginModule = angular
    .module('olmixEvaluator.login', [
      loginControllers.name,
    ])
    .run(loginRun)
    .config(loginConfig);

export default LoginModule;
