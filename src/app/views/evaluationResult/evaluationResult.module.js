import evaluationResultRun from './evaluationResult.run';
import evaluationResultConfig from './evaluationResult.config';
import evaluationResultControllers from './evaluationResult.controllers';

const evaluationResultModule = angular
    .module('olmixEvaluator.evaluationResult', [
      evaluationResultControllers.name,
    ])
    .run(evaluationResultRun)
    .config(evaluationResultConfig);

export default evaluationResultModule;
