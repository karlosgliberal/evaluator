import popupManagerServices from './popupManager.services';

describe('Popup Manager service', () => {
  let popupManager, $ionicPopup, $translate;

  beforeEach(angular.mock.module(popupManagerServices.name, ($provide) => {
    $translate = {instant: sinon.stub()};
    $ionicPopup = {alert: sinon.stub(), confirm: sinon.stub()};

    $provide.value('$translate', $translate);
    $provide.value('$ionicPopup', $ionicPopup);
  }));

  beforeEach(inject((_popupManager_) => {
    popupManager = _popupManager_;
  }));

  it('should alert with title key', () => {
    const key = '::key::';
    const value = '::value::';
    $translate.instant.withArgs(key).returns(value);

    popupManager.alert(key);

    expect($ionicPopup.alert.withArgs({title: value})).to.be.calledOnce;
  });

  it('should prompt with translate keys', done => {
    const translationsMap = {
      '::key::': '::value::',
      '::key2::': '::value2::',
      '::key3::': '::value3::'
    };
    const translationMapKeys = Object.keys(translationsMap);
    $translate.instant.withArgs(translationMapKeys[0]).returns(translationsMap[0]);
    $translate.instant.withArgs(translationMapKeys[1]).returns(translationsMap[1]);
    $translate.instant.withArgs(translationMapKeys[2]).returns(translationsMap[2]);
    $ionicPopup.confirm.returns(Promise.resolve());

    const promptPromise = popupManager.prompt(translationMapKeys[0], translationMapKeys[1], translationMapKeys[2]);

    promptPromise.then(() => {
      expect($ionicPopup.confirm.withArgs({
        title: translationsMap[0],
        okText: translationsMap[1],
        cancelText: translationsMap[2]
      })).to.be.calledOnce;
      done();
    });
  });
});
