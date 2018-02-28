import { assign } from 'lodash';

export default class formController {
  /*@ngInject*/
  constructor($state, formService, $stateParams, formSubmitService, $ionicHistory, logoIcon) {
    assign(this, {
      $state,
      formService,
      $stateParams,
      formSubmitService,
      $ionicHistory,
      logoIcon
    });
    this.selectorViewModel = {};
    this.selector = this.formService.getFormSelector(this.$stateParams.animal, this);
    this.viewModel = {};
    this.fields = this.formService.getFormFields(this.$stateParams.animal);
  }

  onSelectorChange() {
    this.viewModel = {};
    this.fields = this.formService.changeFormFieldsFor(this.selectorViewModel.selector);
    this.subSpecie = this.selectorViewModel.selector;
  }

  onSubmit() {
    if (this.subSpecie === undefined){
      this.subSpecie = 'noPoultry';
    }
    let evaluationResult = this.formSubmitService.processData(this.$stateParams.animal, this.selectorViewModel.selector, this.viewModel, this.subSpecie);
    let stateParams = this.$stateParams;
    let state = this.$state;
    this.$ionicHistory.clearHistory();

    return this.$ionicHistory.clearCache().then(function (){
      state.go('evaluationResult', {animal: stateParams.animal, result: evaluationResult});
    });
  }
}
