import { assign } from 'lodash';
import languages from '../../utils/language';

export default class IdiomaController {
  /*@ngInject*/
  constructor(formService, $translate, $state, $stateParams, localStorageManager, languageFormService) {
    assign(this, {
      formService,
      $translate,
      $state,
      $stateParams,
      localStorageManager,
      languageFormService
    });


    var userLanguage = this.localStorageManager.getDataFor('language');

    if (userLanguage) {
      userLanguage = userLanguage.replace(/(^\")|("$)/gi, '');

      this.$translate.use(userLanguage);
      this.$translate.refresh(userLanguage);
    }

    this.selectorViewModel = {};
    this.selector = this.languageFormService.generateFormRadio(this, userLanguage);
  }

  onSelectorChange() {
    this.$translate.use(this.selectorViewModel.selector);
    this.$translate.refresh(this.selectorViewModel.selector);
    this.localStorageManager.save('language', this.selectorViewModel.selector);
    this.$state.go('animalSelection', null, {reload: true});
  }
}
