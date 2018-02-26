import {assign} from 'lodash';
import './images/logo-olmix.png';
import './images/logos-mtx.png';

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, reportManagerService, languageFormService) {
    assign(this, {
      $stateParams,
      reportManagerService,
      languageFormService
    });
    this.resultPercentage = this.$stateParams.result.porcentaje;
    if (this.resultPercentage === 25) {
      this.resultEmpty = true;
    }
    this.email = '';
    this.emailPattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+(\s*[,.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
    this.resultText = this.$stateParams.result.resultTexto;
    this.resultSubspecie = this.$stateParams.result.subSpecie;
    this.animales = this.$stateParams.animal;
    this.validForm = true;
    this.logoOlmix = './assets/images/logo-olmix.png';
    this.logoMtx = './assets/images/logos-mtx.png';
    this.logoIcon = './assets/images/logo-cabecera.png';
    this.textImageObj = this.languageFormService.getTextImagen(this.$stateParams, this.animales);
  }

  onSubmit() {
    if (this.form.$valid) {
      this.email = this.email.toLowerCase();
      const reportSend = this.reportManagerService.sendReport(
        this.$stateParams.animal,
        this.$stateParams.result,
        this.email
      );

      if (reportSend.result === 'ok') {
        this.email = '';
        this.form.$setPristine();
        this.form.$setUntouched();

        this.validForm = true;
        this.resultMessage = 'ok';
      }
    } else {
      this.validForm = false;
      console.log('error');
    }
  }

  emailChanged() {
    this.validForm = true;
  }
}
