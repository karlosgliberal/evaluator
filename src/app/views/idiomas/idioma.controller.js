import { assign } from 'lodash';
import languages from '../../utils/language';

export default class IdiomaController {
  /*@ngInject*/
  constructor(formService, $translate, $state, $stateParams) {
    assign(this, {
      formService,
      $translate,
      $state,
      $stateParams
    });

    this.selectorViewModel = {};
    this.selector = this.formService.getFormSelector(languages, this);
  }

  onSelectorChange() {
    this.$translate.use(this.selectorViewModel.selector);
    console.log(this.$translate.use(this.selectorViewModel.selector));
    this.$translate.refresh(this.selectorViewModel.selector);
    this.$state.go('animalSelection', null, {reload: true});
  }
}
