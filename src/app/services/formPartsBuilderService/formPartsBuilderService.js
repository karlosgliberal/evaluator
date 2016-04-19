import poultry from '../../utils/poultry';
import {assign} from 'lodash';

export default class formPartsBuilderService {
  /*@ngInject*/
  constructor($translate) {
    assign(this, {$translate});
  };

  buildSelectorFor(labelReferenceBase, key, options, state) {
    this.labelReferenceBase = labelReferenceBase;
    return [
      {
        key: key,
        type: 'select',
        defaultValue: 'default',
        templateOptions: {
          onChange: function () {
            state.onSelectorChange();
          },
          label: this.$translate.instant(this.labelReferenceBase + 'selector.title'),
          options: this.buildChoiceListFor(options),
          valueProp: 'id',
          labelProp: 'label'
        }
      }];
  }

  buildRadioFor(labelReferenceBase, key, languages, state, userLanguage) {
    this.labelReferenceBase = labelReferenceBase;
    return [
      {
        key: key,
        type: 'radio',
        defaultValue: userLanguage,
        templateOptions: {
          onChange: function () {
            state.onSelectorChange();
          },
          label: this.$translate.instant(this.labelReferenceBase + 'selector.title'),
          options: this.buildRadioChoiceListFor(languages),
        },
      }];
  }

  buidInputEmailFor(labelReferenceBase, key, options, state) {
    this.labelReferenceBase = '';
    return [
      {
        key: 'email',
        type: 'stacked-input',
        templateOptions: {
          type: 'email',
          label: 'Email',
          placeholder: 'Email'
        }
      }];
  }

  buildWrapperFor(labelReferenceBase, key, fieldList) {
    this.labelReferenceBase = labelReferenceBase;
    return {
      key: key,
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant(this.labelReferenceBase + key + '.title')},
      fieldGroup: this.buildFieldGroupFor(fieldList, key + '.fields.')
    };
  }

  buildChoiceListFor(options) {
    var selectorFields = 'selector.fields.';
    return _.map(options, (type) => {
      return {
        label: this.$translate.instant(this.labelReferenceBase + selectorFields + type),
        id: type
      };
    });
  }

  buildRadioChoiceListFor(options) {
    var selectorFields = '';
    return _.map(options, (type) => {
      return {
        text: this.$translate.instant(this.labelReferenceBase + selectorFields + type),
        value: type
      };
    });
  }

  buildFieldGroupFor(fieldsList, fieldGroup) {
    return _.map(fieldsList, (field, value) => {
      return this.buildCheckboxFor(value, fieldGroup);
    });
  }

  buildCheckboxFor(field, fieldGroup) {
    return {
      type: 'checkbox',
      key: field,
      templateOptions: {
        label: this.$translate.instant(this.labelReferenceBase + fieldGroup + field)
      }
    };
  }
}
