import { assign } from 'lodash';

export default class formController {
  /*@ngInject*/
  constructor($state, formService, $stateParams, formSubmitService) {
    assign(this, {
      $state,
      formService,
      $stateParams,
      formSubmitService,
    });

    this.selectorViewModel = {};
    this.selector = this.formService.getFormSelector(this.$stateParams.animal, this);

    this.viewModel = {};
    this.fields = this.formService.getFormFields(this.$stateParams.animal);
  }

  onSelectorChange() {
    this.viewModel = {};
    this.fields = this.formService.changeFormFieldsFor(this.selectorViewModel.selector);
  }

  onSubmit() {
    var evaluationResult = this.formSubmitService.processData(this.$stateParams.animal, this.selectorViewModel.selector, this.viewModel);
    this.$state.go('evaluationResult', {animal: this.$stateParams.animal, result: evaluationResult});
  }
}
