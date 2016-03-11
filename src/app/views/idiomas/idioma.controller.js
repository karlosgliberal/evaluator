import { assign } from 'lodash';

export default class IdiomaController {
    /*@ngInject*/
  constructor($scope, $state, $translate) {
    assign(this, {
      $scope,
      $state,
      $translate,
      languages: [{name: 'Castellano', code: 'es'}, {name: 'English', code: 'en'}]
    });
  }


  setLanguage(language) {
    this.$translate.use(language.code);
    this.$translate.refresh(language.code);
    this.$state.go('home', null, {reload: true});
  }
}
