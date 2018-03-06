import {assign} from 'lodash';

const emailPattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+(\s*[,.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;

export default class EvaluationResultController {
  /*@ngInject*/
  constructor($stateParams, reportManagerService, languageFormService) {
    assign(this, {$stateParams, reportManagerService, languageFormService});

    this.resultPercentage = this.$stateParams.result.porcentaje;
    if (this.resultPercentage === 25) {
      this.resultEmpty = true;
    }
    this.email = '';
    this.emailPattern = emailPattern;
    this.resultText = this.$stateParams.result.resultTexto;
    this.resultSubspecie = this.$stateParams.result.subSpecie;
    this.animales = this.$stateParams.animal;
    this.showSavedFormLabel = true;
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
          this.showSavedFormLabel = true;
          this.sendingReport = false;
          this.resultMessage = 'ok';
        });
    } else {
      this.showSavedFormLabel = false;
    }
  }

  emailChanged() {
    this.showSavedFormLabel = true;
  }
}
