import {assign} from 'lodash';

const labelReferenceBase = 'forms.cow.herd.fields.';

export default class cowFormService {
  /*@ngInject*/
  constructor($translate) {
    assign(this, {$translate});
  };

  generateCowForm() {
    return [{
      key: 'herd-title',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.herd.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowHerdFieldsList())
    }, {
      key: 'on-field',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.herd.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowOnFieldFieldsList())
    }, {
      key: 'storage',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.cow.herd.title')},
      fieldGroup: this.createFieldGroup(cowFormService.cowStorageFieldsList())
    }
    ];
  }

  createFieldGroup(fieldsList) {
    return _.map(fieldsList, (field) => {
      return this.createCheckbox(field);
    });
  }

  createCheckbox(fieldName) {
    return {
      type: 'checkbox',
      key: fieldName,
      templateOptions: {
        label: this.$translate.instant(labelReferenceBase + fieldName)
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
    return ['molds', 'sillage-trobules', 'warm-silage', 'grass-silage', 'silage-front-consuption'];
  }
}

