import {assign} from 'lodash';
import languages from '../../utils/language';

const labelReferenceBase = 'language.';

export default class languageFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateFormRadio(state) {
    return this.formPartsBuilderService.buildRadioFor('language.', 'selector', languages, state, false);
  }

  // generateLanguageForm(translate, state) {
  //   return [{
  //     key: 'language',
  //     type: 'select',
  //     defaultValue: translate.use(),
  //     templateOptions: {
  //       label: translate.instant('language selection'),
  //       valueProp: 'code',
  //       labelProp: 'name',
  //       onChange: function (lang) {
  //         translate.use(lang);
  //         translate.refresh(lang);
  //         state.go('home', null, {reload: true});
  //       }
  //     },
  //     controller: /*@ngInject*/ function ($scope, $translate) {
  //       var lang = [];
  //       _.each(languages, (langCode) => {
  //         lang.push({name: $translate.instant('language.' + langCode), code: langCode});
  //       });
  //       $scope.to.options = lang;
  //     }
  //   }];
  // }
}
