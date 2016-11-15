import { assign } from 'lodash';

export default class formController {
  /*@ngInject*/
  constructor($state, formService, $stateParams, formSubmitService, $ionicHistory) {
    assign(this, {
      $state,
      formService,
      $stateParams,
      formSubmitService,
      $ionicHistory
    });
    this.logoIcon = './assets/images/logo-cabecera.png';
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
    let evaluationResult = this.formSubmitService.processData(this.$stateParams.animal, this.selectorViewModel.selector, this.viewModel);
    let stateParams = this.$stateParams;
    let state = this.$state;
    this.$ionicHistory.clearHistory();
    this.$ionicHistory.clearCache().then(function (){
      console.log('histoico');
      state.go('evaluationResult', {animal: stateParams.animal, result: evaluationResult});
    });
  }
}
