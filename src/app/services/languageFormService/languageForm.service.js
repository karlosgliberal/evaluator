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
        var lang = [];
        _.each(languages, (langCode) => {
          lang.push({name: $translate.instant('language.' + langCode), code: langCode});
        });
        $scope.to.options = lang;
      }
    }];
  }
}
