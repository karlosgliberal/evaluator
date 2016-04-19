import {assign} from 'lodash';
import languages from '../../utils/language';

const labelReferenceBase = 'language.';

export default class languageFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateFormRadio(state, userLanguage) {
    return this.formPartsBuilderService.buildRadioFor('language.', 'selector', languages, state, userLanguage);
  }
}
