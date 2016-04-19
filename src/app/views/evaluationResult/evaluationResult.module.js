import evaluationResultRun from './evaluationResult.run';
import evaluationResultConfig from './evaluationResult.config';
import evaluationResultControllers from './evaluationResult.controllers';
import networkManagerService from './../../services/networkManagerService/networkManager.services';

const evaluationResultModule = angular
    .module('olmixEvaluator.evaluationResult', [
      evaluationResultControllers.name,
      networkManagerService.name,
    ])
    .run(evaluationResultRun)
    .config(evaluationResultConfig);

export default evaluationResultModule;
