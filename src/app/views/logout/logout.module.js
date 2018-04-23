import logoutRun from './logout.run';
import logoutControllers from './logout.controllers';

const LogoutModule = angular
    .module('olmixEvaluator.logout', [
      logoutControllers.name,
    ])
    .run(logoutRun);

export default LogoutModule;
