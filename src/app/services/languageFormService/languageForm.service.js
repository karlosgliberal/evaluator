import {assign} from 'lodash';
import languages from '../../utils/language';


export default class languageFormService {
  /*@ngInject*/
  constructor($translate, formService) {
    assign(this, {$translate, formService});
  };

  generateLanguageForm(translate, state) {
    return [{
      key: 'language',
      type: 'select',
      defaultValue: translate.use(),
      templateOptions: {
        label: translate.instant('language selection'),
        valueProp: 'code',
        labelProp: 'name',
        onChange: function (lang) {
          translate.use(lang);
          translate.refresh(lang);
          state.go('home', null, {reload: true});
        }
      },
      controller: /*@ngInject*/ function ($scope, $translate) {
        for (var i = 0; i < languages.length; i++) {
          languages[i].name = $translate.instant('language.' + languages[i].code);
        }
        $scope.to.options = languages;
      }
    }];
  }
}
