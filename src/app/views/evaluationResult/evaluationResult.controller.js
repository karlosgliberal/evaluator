import { assign } from 'lodash';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, formPartsBuilderService, reportManagerService) {
    assign(this, {
      $stateParams,
      formPartsBuilderService,
      reportManagerService
    });

    this.viewModel = {};
    this.fields = this.formPartsBuilderService.buidInputEmailFor();
  }

  onSubmit() {
    if (this.form.$valid) {
      var reportSend = this.reportManagerService.sendReport(
          this.$stateParams.animal,
          this.$stateParams.result,
          this.viewModel.email
      );
      if (reportSend.result === 'ok') {
        console.log(reportSend.result);
        this.resultMessage = 'ok';
      } else {
        this.resultMessage = reportSend.error;
      }
    } else {
      console.log('error');
      this.resultMessage = 'email error';
    }
  }
}
