import poultry from '../../../utils/poultry';
import poultryFields from '../../../utils/fields/poultryFields';
import {assign} from 'lodash';

const labelReferenceBase = 'forms.poultry.';

export default class poultryFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateFormSelector(state) {
    return this.formPartsBuilderService.buildSelectorFor(labelReferenceBase, 'selector', poultry, state);
  }

  generateForm(poultrySpecie) {
    if (_.isEqual(poultrySpecie, poultry.BROILER)) {
      return this.generateBroilerForm();
    } else if (_.isEqual(poultrySpecie, poultry.BREEDER)) {
      return this.generateBreederForm();
    } else if (_.isEqual(poultrySpecie, poultry.HENS)) {
      return this.generateLayingHensForm();
    }
    return '';
  }

  generateLayingHensForm() {
    return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'animals', poultryFields.poultryLayingHensAnimalFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'egg-production', poultryFields.poultryLayingHensEggsProductionFieldList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'feed', poultryFields.poultryLayingHensFeedFieldList())
    ];
  }

  generateBreederForm() {
    return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'animals', poultryFields.poultryBreederAnimalFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'egg-production', poultryFields.poultryBreederEggsProductionFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'feed', poultryFields.poultryBreederFeedFieldsList())
    ];

  }

  generateBroilerForm() {
    return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'animals.broiler', poultryFields.poultryBroilerAnimalFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'feed', poultryFields.poultryBroilerFeedFieldsList())
    ];
  }

  generateChoiceList() {
    return _.map(poultry, (type) => {
      return {
        label: this.$translate.instant(labelReferenceBase + 'selector.fields.' + type),
        id: type
      };
    });
  }
}
