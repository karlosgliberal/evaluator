import { assign } from 'lodash';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams) {
    assign(this, {
      $stateParams
    });
  }
}
