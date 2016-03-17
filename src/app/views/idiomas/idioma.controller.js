import { assign } from 'lodash';
import languages from '../../utils/language';

export default class IdiomaController {
  /*@ngInject*/
  constructor(languageFormService, $translate, $state) {
    assign(this, {
      languageFormService,
      $translate,
      $state
    });
    this.viewModel = {};
    this.fields = this.languageFormService.generateLanguageForm(this.$translate, this.$state);
  }
}
