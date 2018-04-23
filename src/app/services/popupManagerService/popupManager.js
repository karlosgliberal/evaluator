import {assign} from 'lodash';

export default class popupManager {
  /*@ngInject*/
  constructor($ionicPopup, $translate) {
    assign(this, {$ionicPopup, $translate});
  };

  alert(titleTranslateKey) {
    return this.$ionicPopup.alert({
      title: this.$translate.instant(titleTranslateKey)
    });
  }

  prompt(titleTranslateKey, okTranslateKey, cancelTranslateKey) {
    return this.$ionicPopup.confirm({
      title: this.$translate.instant(titleTranslateKey),
      okText: this.$translate.instant(okTranslateKey),
      cancelText: this.$translate.instant(cancelTranslateKey)
    });
  }
}
