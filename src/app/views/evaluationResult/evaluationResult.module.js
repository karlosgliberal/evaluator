import evaluationResultRun from './evaluationResult.run';
import evaluationResultConfig from './evaluationResult.config';
import evaluationResultControllers from './evaluationResult.controllers';
import formPartsBuilderService from './../../services/formPartsBuilderService/formPartsBuilder.services';
import reportManagerService from './../../services/reportManagerService/reportManager.services';
import languageFormService from './../../services/languageFormService/languageForm.services';

const evaluationResultModule = angular
    .module('olmixEvaluator.evaluationResult', [
      evaluationResultControllers.name,
      formPartsBuilderService.name,
      reportManagerService.name,
      languageFormService.name
    ])
    .run(evaluationResultRun)
    .config(evaluationResultConfig);

export default evaluationResultModule;
