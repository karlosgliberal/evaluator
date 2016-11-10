import {assign} from 'lodash';

export default class resultManager {
  /*@ngInject*/
  constructor($translate){
    assign(this, {$translate});
  };

  prepareResult(evaluationResult){
    var result = {};
    if (evaluationResult > 95) {
      //return 95;
      _.assign(result, {
        resultPercentage: evaluationResult
      });
    } else if (evaluationResult < 26) {
      _.assign(result, {
        resultPercentage: evaluationResult
      });
    }

    if (evaluationResult <= 300 && evaluationResult >= 60) {
      return this.$translate.instant('evaluationResult.riskHigh');
    } else if (evaluationResult <= 59 && evaluationResult >= 40) {
      return this.$translate.instant('evaluationResult.riskMedium');
    } else if (evaluationResult <= 39 && evaluationResult >= 0) {
      return this.$translate.instant('evaluationResult.riskLow');
    }

  }

  prepareResultPercentage(evaluationResult) {
    if (evaluationResult > 95) {
      return 95;
    } else if (evaluationResult < 26) {
      return 25;
    }
    return _.round(evaluationResult);
  }

  prepareResultText(evaluationResult) {
    if (evaluationResult <= 300 && evaluationResult >= 60) {
      return this.$translate.instant('evaluationResult.riskHigh');
    } else if (evaluationResult <= 59 && evaluationResult >= 40) {
      return this.$translate.instant('evaluationResult.riskMedium');
    } else if (evaluationResult <= 39 && evaluationResult >= 0) {
      return this.$translate.instant('evaluationResult.riskLow');
    }
  }
}
