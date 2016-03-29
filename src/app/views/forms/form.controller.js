import { assign } from 'lodash';

export default class formController {
  /*@ngInject*/
  constructor(formService, $stateParams) {
    assign(this, {
      formService,
      $stateParams
    });

    this.selectorViewModel = {};
    this.selector = this.formService.getFormSelector(this.$stateParams.animal, this);

    this.viewModel = {};
    this.fields = this.formService.getFormFields(this.$stateParams.animal);
  }

  onSelectorChange() {
    this.fields = this.formService.changeFormFieldsFor(this.selectorViewModel.poultrySelector);
  }
}
