import {assign} from 'lodash';
import swineFields from '../../../utils/fields/swineFields';

const labelReferenceBase = 'forms.swine.';

export default class swineFormService {
  /*@ngInject*/
  constructor(formPartsBuilderService) {
    assign(this, {formPartsBuilderService});
  };

  generateForm() {
    return [
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'animal', swineFields.swineOnAnimalFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'feed', swineFields.swineOnFeedFieldsList()),
    ];
  }
}
