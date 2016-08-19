import { assign } from 'lodash';
import './images/logo-olmix.png';
import './images/logos-mtx.png';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, formPartsBuilderService, reportManagerService) {
    assign(this, {
      $stateParams,
      formPartsBuilderService,
      reportManagerService
    });
    this.resultPercentage = this.$stateParams.result.resultPercentage;
    this.resultText = this.$stateParams.result.resultText;
    this.viewModel = {};
    this.fields = this.formPartsBuilderService.buidInputEmailFor();
    this.logoOlmix = './assets/images/logo-olmix.png';
    this.logoMtx = './assets/images/logos-mtx.png';
  }

  onSubmit() {
    if (this.form.$valid) {
      var reportSend = this.reportManagerService.sendReport(
          this.$stateParams.animal,
          this.$stateParams.result.resultPercentage,
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
