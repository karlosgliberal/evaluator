import { assign } from 'lodash';
import languages from '../../utils/language';

export default class IdiomaController {
  /*@ngInject*/
  constructor(
    formService,
    $translate,
    $state,
    $stateParams,
    localStorageManager,
    languageFormService,
    $ionicHistory
  ) {
    assign(this, {
      formService,
      $translate,
      $state,
      $stateParams,
      localStorageManager,
      languageFormService,
      $ionicHistory
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
    let state = this.$state;
    this.$ionicHistory.clearHistory();
    this.$ionicHistory.clearCache().then(function (){
      state.go('animalSelection', {}, {reload: true});
    });
  }
}
