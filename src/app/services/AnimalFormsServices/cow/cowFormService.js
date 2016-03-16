import {assign} from 'lodash';

const labelReferenceBase = 'forms.cow.';

export default class cowFormService {
  /*@ngInject*/
  constructor($translate) {
    assign(this, {$translate});
  };

  generateForm() {
    return [{
      key: 'herd',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.herd.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowHerdFieldsList(), 'herd.fields.')
    }, {
      key: 'on-field',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.on-field.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowOnFieldFieldsList(), 'on-field.fields.')
    }, {
      key: 'storage',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.storage.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowStorageFieldsList(), 'storage.fields.')
    }
    ];
  }

  createFieldGroup(fieldsList, fieldGroup) {
    return _.map(fieldsList, (field) => {
      return this.createCheckbox(field, fieldGroup);
    });
  }

  createCheckbox(fieldName, fieldGroup) {
    return {
      type: 'checkbox',
      key: fieldName,
      templateOptions: {
        label: this.$translate.instant(labelReferenceBase + fieldGroup + fieldName)
      }
    };
  }

  static cowHerdFieldsList() {
    return ['feed-intake', 'low-milk-production', 'body-condition', 'coat-condition',
      'chewing-activity', 'somatic-cells', 'leg-troubles', 'metabolic-troubles',
      'turnovers', 'feces', 'milk-urea', 'weak-calves', 'fertility-troubles',
      'reproduction-performance', 'troubles-from-raw-materials'];
  }

  static cowOnFieldFieldsList() {
    return ['corn-procedence', 'corn-fields', 'fusarium', 'silage-harvest', 'grass-silage'];
  }

  static cowStorageFieldsList() {
    return ['molds', 'sillage-troubles', 'warm-silage', 'grass-silage', 'silage-front-consuption'];
  }
}

