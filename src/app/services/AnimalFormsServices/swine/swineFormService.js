import {assign} from 'lodash';

const labelReferenceBase = 'forms.swine.';

export default class swineFormService {
  /*@ngInject*/
  constructor($translate) {
    assign(this, {$translate});
  };

  generateForm() {
    return [{
      key: 'animal',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant('forms.swine.animal.title')},
      fieldGroup: this.createFieldGroup(swineFormService.swineOnAnimalFieldsList(), 'animal.fields.')
    }, {
      key: 'feed',
      wrapper: 'panel',
      templateOptions: {label: this.$translate.instant(labelReferenceBase + 'feed.title')},
      fieldGroup: this.createFieldGroup(swineFormService.swineOnFeedFieldsList(), 'feed.fields.')
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

  static swineOnAnimalFieldsList() {
    return ['sows-status',
      'poor-growth',
      'intake',
      'skin-color',
      'milk-production',
      'veterinary-intervention',
      'lactation-start',
      'stillborn-piglets',
      'small-piglets-at-birth',
      'splay-legs',
      'red-vulva',
      'neonatal-diarrea',
      'necrosis',
      'reproduction-troubles',
      'heat-detection',
      'weaning-insemination'];
  }

  static swineOnFeedFieldsList() {
    return ['home-grown',
      'use-of-corn',
      'storage-facilities',
      'grains-preservation-problems'];
  }
}

