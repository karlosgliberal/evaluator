import localStorageManagerServices from './localStorageManager.services';

describe('Local storage manager service', () => {
  var localStorageManager, sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(angular.mock.module(localStorageManagerServices.name));

  beforeEach(inject((_localStorageManager_) => {
    Object.defineProperty(sessionStorage, 'setItem', {writable: true});
    Object.defineProperty(sessionStorage, 'getItem', {writable: true});

    localStorageManager = _localStorageManager_;
  }));

  it('should save data', () => {
    var store = {}, localStorageKey, dataToSave = {data: '::data::'}, expected = JSON.stringify(dataToSave);
    sandbox.stub(window.localStorage, 'setItem').callsFake((key, value) => {
      store[key] = value;
      localStorageKey = key;
    });

    localStorageManager.save('::key::', {data: '::data::'});

    expect(store[localStorageKey]).to.be.equal(expected);
  });

  it('should get data', () => {
    sandbox.stub(window.localStorage, 'getItem').returns('result');

    var retrievedData = localStorageManager.getDataFor('::key::');

    expect(retrievedData).to.be.equal('result');
  });

  it('should remove data', () => {
    let localStorageKey = '::key::';
    let store = {localStorageKey: {}};
    sandbox.stub(window.localStorage, 'removeItem').callsFake(key => {
      delete store[key];
    });

    localStorageManager.remove();

    expect(store[localStorageKey]).to.be.undefined;
  });
});
