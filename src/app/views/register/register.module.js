import registerRun from './register.run';
import registerConfig from './register.config';
import registerControllers from './register.controllers';

const RegisterModule = angular
    .module('olmixEvaluator.register', [
      registerControllers.name,
    ])
    .run(registerRun)
    .config(registerConfig);

export default RegisterModule;
