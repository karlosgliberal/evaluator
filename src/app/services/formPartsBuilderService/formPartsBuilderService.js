import poultry from '../../utils/poultry';
import {assign} from 'lodash';

export default class formPartsBuilderService {

  constructor($translate) {
    assign(this, {$translate});
  };

  buildWrapperFor(labelReferenceBase, key, fieldList) {
    this.labelReferenceBase = labelReferenceBase;
    return {
      key: key,
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant(this.labelReferenceBase + key + '.title')},
      fieldGroup: this.buildFieldGroupFor(fieldList, key + '.fields.')
    };
  }

  buildSelectorFor(labelReferenceBase, key, animal, state) {
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
          options: this.buildChoiceListFor(animal),
          valueProp: 'id',
          labelProp: 'label'
        }
      }];
  }

  buildChoiceListFor(animal) {
    return _.map(animal, (type) => {
      return {
        label: this.$translate.instant(this.labelReferenceBase + 'selector.fields.' + type),
        id: type
      };
    });
  }

  buildFieldGroupFor(fieldsList, fieldGroup) {
    return _.map(fieldsList, (field) => {
      return this.buildCheckboxFor(field, fieldGroup);
    });
  }

  buildCheckboxFor(fieldName, fieldGroup) {
    return {
      type: 'checkbox',
      key: fieldName,
      templateOptions: {
        label: this.$translate.instant(this.labelReferenceBase + fieldGroup + fieldName),
      }
    };
  }
}
