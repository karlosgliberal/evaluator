import networkManagerServices from './networkManager.services';

describe('Network Manager service', () => {
  let networkManagerService, sandbox, $cordovaNetwork, navigator, $window;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(angular.mock.module(networkManagerServices.name));

  beforeEach(angular.mock.module('ngCordova.plugins.network'));

  beforeEach(inject((_$cordovaNetwork_, _networkManagerService_, _$window_) => {
    $cordovaNetwork = _$cordovaNetwork_;
    networkManagerService = _networkManagerService_;
    $window = _$window_;
    navigator = $window.navigator;
    $window.Connection = {
      UNKNOWN: 'UNKNOWN',
      NONE: 'NONE',
      CELL_2G: 'CELL_2G'
    };
    navigator.connection = { type: $window.Connection.NONE};
  }));

  it('should be online when not webview and has connection', () => {
    ionic.Platform.isWebView = () => false;

    let isOnline = networkManagerService.isOnline();

    expect(isOnline).to.be.true;
  });

  it('should be online when webview and has connection', () => {
    ionic.Platform.isWebView = () => true;
    navigator.connection = { type: $window.Connection.CELL_2G};

    let isOnline = networkManagerService.isOnline();

    expect(isOnline).to.be.true;
  });

  it('should not be online when webview and has no connection', () => {
    ionic.Platform.isWebView = () => true;
    navigator.connection = { type: $window.Connection.NONE};

    let isOnline = networkManagerService.isOnline();

    expect(isOnline).to.be.false;
  });

  it('should not be offline when webview and has connection', () => {
    ionic.Platform.isWebView = () => true;
    navigator.connection = { type: $window.Connection.CELL_2G};

    let isOffline = networkManagerService.isOffline();

    expect(isOffline).to.be.false;
  });

  it('should be offline when webview and has no connection', () => {
    ionic.Platform.isWebView = () => true;
    navigator.connection = { type: $window.Connection.NONE};

    let isOffline = networkManagerService.isOffline();

    expect(isOffline).to.be.true;
  });

  it('should not be offline when not webview and has connection', () => {
    ionic.Platform.isWebView = () => false;

    let isOffline = networkManagerService.isOffline();

    expect(isOffline).to.be.false;
  });
});
