import {assign} from 'lodash';
import './images/logo-olmix.png';
import './images/logos-mtx.png';

const emailPattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+(\s*[,.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, reportManagerService, languageFormService, logoIcon) {
    assign(this, {
      $stateParams,
      reportManagerService,
      languageFormService,
      logoIcon
    });
    this.resultPercentage = this.$stateParams.result.porcentaje;
    if (this.resultPercentage === 25) {
      this.resultEmpty = true;
    }
    this.email = '';
    this.emailPattern = emailPattern;
    this.resultText = this.$stateParams.result.resultTexto;
    this.resultSubspecie = this.$stateParams.result.subSpecie;
    this.animales = this.$stateParams.animal;
    this.validForm = true;
    this.logoOlmix = './assets/images/logo-olmix.png';
    this.logoMtx = './assets/images/logos-mtx.png';
    this.textImageObj = this.languageFormService.getTextImagen(this.$stateParams, this.animales);
  }

  onSubmit() {
    if (this.form.$valid) {
      this.email = this.email.toLowerCase();

      this.sendingReport = true;
      return this.reportManagerService
        .sendReport(this.$stateParams.animal, this.$stateParams.result, this.email)
        .then(response => {
          this.form.$setPristine();
          this.form.$setUntouched();
          this.email = '';
          this.validForm = true;
          this.sendingReport = false;
          this.resultMessage = 'ok';
        });
    } else {
      this.validForm = false;
    }
  }

  emailChanged() {
    this.validForm = true;
  }
}
