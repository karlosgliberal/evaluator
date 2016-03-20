import { assign } from 'lodash';

export default class formController {
  /*@ngInject*/
  constructor(formService, $stateParams) {
    assign(this, {
      formService,
      $stateParams
    });
    this.viewModel = {};
    this.fields = this.formService.getFormFields($stateParams.animal);
  }

  onFormBaseChange(){
    this.fields = this.formService.changeFormFieldsForValues(this, this.viewModel.typeSelector);
  }
}
