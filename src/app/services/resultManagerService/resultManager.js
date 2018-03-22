import {assign} from 'lodash';

export default class resultManager {
  /*@ngInject*/
  constructor($translate){
    assign(this, {$translate});
  };

  prepareResultPercentage(evaluationResult) {
    if (evaluationResult > 95) {
      return 95;
    } else if (evaluationResult < 26) {
      return 25;
    }

    return _.round(evaluationResult);
  }

  prepareResultText(evaluationResult) {
    evaluationResult = _.round(evaluationResult);
    if (evaluationResult <= 300 && evaluationResult >= 76) {
      return this.$translate.instant('evaluationResult.riskExtreme');
    } else if (evaluationResult <= 75 && evaluationResult >= 56){
      return this.$translate.instant('evaluationResult.riskHigh');
    } else if (evaluationResult <= 55 && evaluationResult >= 38) {
      return this.$translate.instant('evaluationResult.riskMedium');
    } else if (evaluationResult <= 37 && evaluationResult >= 0) {
      return this.$translate.instant('evaluationResult.riskLow');
    }
  }
}
