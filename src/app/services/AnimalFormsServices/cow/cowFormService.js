import {assign} from 'lodash';
import cowFields from '../../../utils/fields/cowFields';

const labelReferenceBase = 'forms.cow.';

export default class cowFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateForm() {
    return [this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'herd', cowFields.cowHerdFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'on-field', cowFields.cowOnFieldFieldsList()),
      this.formPartsBuilderService.buildWrapperFor(labelReferenceBase, 'storage', cowFields.cowStorageFieldsList())
    ];
  }
}
