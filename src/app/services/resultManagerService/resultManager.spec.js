import resultManagerServices from './resultManager.services';


describe('Result text and percentage', () => {

  var resultManagerService, spy, translateStub;
  
  var sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  beforeEach(angular.mock.module(resultManagerServices.name));

  beforeEach(inject((_resultManager_)=> {
    resultManagerService = _resultManager_;
  }));

  // it('should prepare the result', () => {
  //   var fieldsSum = resultManagerService.prepareResult(30);
  //
  //   expect(fieldsSum).to.be.equal(30);
  // });
  //
  // it('should prepare round the result', () => {
  //   var fieldsSum = resultManagerService.prepareResult(50.14);
  //
  //   expect(fieldsSum).to.be.equal(50);
  // });
  //
  // it('should prepare max result', () => {
  //   var fieldsSum = resultManagerService.prepareResult(115);
  //
  //   expect(fieldsSum).to.be.equal(95);
  // });
  //
  // it('should prepare min result', () => {
  //   var fieldsSum = resultManagerService.prepareResult(25);
  //
  //   expect(fieldsSum).to.be.equal(25);
  // });
  
});
