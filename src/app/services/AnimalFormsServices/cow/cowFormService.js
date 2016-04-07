import {assign} from 'lodash';
import cowFields from '../../../utils/fields/cowFields';
import languages from '../../../utils/language';

const labelReferenceBase = 'forms.cow.';

export default class cowFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateForm() {
    if (this.$translate.use() === languages.CHINESE || this.$translate.use() === languages.VIETNAMESE) {
      return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'herd', cowFields.cowHerdFieldsList()),
        this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'feed', cowFields.cowFeedFieldsList())];
    } else {
      return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'herd', cowFields.cowHerdFieldsList()),
        this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'on-field', cowFields.cowOnFieldFieldsList()),
        this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'storage', cowFields.cowStorageFieldsList())
      ];
    }
  }
}
