import { assign } from 'lodash';
import './images/logo-olmix.png';
import './images/logos-mtx.png';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, formPartsBuilderService, reportManagerService, languageFormService) {
    assign(this, {
      $stateParams,
      formPartsBuilderService,
      reportManagerService,
      languageFormService
    });
    this.viewModel = {};
    this.resultPercentage = this.$stateParams.result.porcentaje;
    this.resultText = this.$stateParams.result.resultTexto;
    this.animales = this.$stateParams.animal;
    this.fields = this.formPartsBuilderService.buidInputEmailFor();
    this.logoOlmix = './assets/images/logo-olmix.png';
    this.logoMtx = './assets/images/logos-mtx.png';
    this.logoIcon = './assets/images/logo-cabecera.png';
    this.textImageObj = this.languageFormService.getTextImagen(this.$stateParams, this.animales);
    this.imageAnimal = this.textImageObj.image;
    this.textAnimal = this.textImageObj.texto;
  }

  onSubmit() {
    if (this.form.$valid) {
      var reportSend = this.reportManagerService.sendReport(
          this.$stateParams.animal,
          this.$stateParams.result,
          this.viewModel.email
      );
      if (reportSend.result === 'ok') {
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
