import networkManagerServices from './networkManager.services';

describe('network Manager service', () => {
  var networkManagerService, sandbox, $cordovaNetwork, $cordovaNetwork;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(angular.mock.module(networkManagerServices.name));

  beforeEach(angular.mock.module('ngCordova.plugins.network'));

  beforeEach(inject((_$cordovaNetwork_, _networkManagerService_) => {
    $cordovaNetwork = _$cordovaNetwork_;
    networkManagerService = _networkManagerService_;

    window.Connection = {
      UNKNOWN: 'UNKNOWN',
      NONE: 'NONE',
      CELL_2G: 'CELL_2G'
    };

    navigator.connection = {
      type: window.Connection.NONE
    };
  }));

  it('should return isOnline as true when si es none o UNKNOW', () => {
    navigator.connection.type = window.Connection.CELL_2G;
    expect($cordovaNetwork.isOnline()).to.be.true;
    navigator.connection.type = window.Connection.UNKNOWN;
    expect($cordovaNetwork.isOnline()).to.be.false;
  });

  it('should return the network type', () => {
    expect($cordovaNetwork.getNetwork()).to.be.equal(window.Connection.NONE);
  });

  it('should io online', () => {
    var isOnline = networkManagerService.isOnline();
    expect(isOnline).to.be.equal(true);
  });


});
