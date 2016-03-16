import { assign } from 'lodash';

export default class formService {
  /*@ngInject*/
  constructor(cowFormService){
    assign(this, {cowFormService});
  };

  getFormFields() {
    return this.cowFormService.generateCowForm();
  };

  changeFormFieldsForValues(state, modelValue) {
    if (modelValue === 'type1') {
      return this.firstModelFields(state);
    }
    return this.secondModelFields(state);
  };

  firstModelFields(state) {
    return [
      {
        key: 'typeSelector',
        type: 'select',
        defaultValue: 'type1',
        templateOptions: {
          onChange: function () {
            state.onFormBaseChange();
          },
          label: 'Select type',
          options: [{
            label: 'Type 1',
            id: 'type1'
          }, {
            label: 'Type 2',
            id: 'type2'
          }],
          valueProp: 'id',
          labelProp: 'label'
        }
      },
      {
        key: 'type1name',
        type: 'inline-input',
        templateOptions: {
          type: 'text',
          label: 'Type 1 name'
        }
      }
    ];
  };

  secondModelFields(state) {
    return [
      {
        key: 'typeSelector',
        type: 'select',
        defaultValue: 'type2',
        templateOptions: {
          onChange: function ($modelValue) {
            state.onFormBaseChange($modelValue);
          },
          label: 'Select type',
          options: [{
            label: 'Type 1',
            id: 'type1'
          }, {
            label: 'Type 2',
            id: 'type2'
          }],
          valueProp: 'id',
          labelProp: 'label'
        }
      },
      {
        key: 'type2name',
        type: 'inline-input',
        templateOptions: {
          type: 'text',
          label: 'Type 2 name'
        }
      }
    ];
  }
}
