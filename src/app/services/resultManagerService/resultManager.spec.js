import resultManagerServices from './resultManager.services';

describe('Result Manager service', () => {

  let translate, resultManagerService;

  beforeEach(angular.mock.module(resultManagerServices.name));
  beforeEach(angular.mock.module(resultManagerServices.name, $provide => {
    translate = {instant: sinon.stub()};
    $provide.value('$translate', translate);
  }));

  beforeEach(inject((_resultManager_)=> {
    resultManagerService = _resultManager_;
  }));

  it('should prepare result percentage for max result', () => {
    const resultPercentage = resultManagerService.prepareResultPercentage(96);

    expect(resultPercentage).to.be.equal(95);
  });

  it('should prepare result percentage for min result', () => {
    const resultPercentage = resultManagerService.prepareResultPercentage(10);

    expect(resultPercentage).to.be.equal(25);
  });

  it('should prepare result percentage for other result', () => {
    const resultPercentage = resultManagerService.prepareResultPercentage(50.15);

    expect(resultPercentage).to.be.equal(50);
  });

  it('should prepare result percentage for another result', () => {
    const resultPercentage = resultManagerService.prepareResultPercentage(31.7);

    expect(resultPercentage).to.be.equal(32);
  });

  it('should prepare result text for extreme risk result', () => {
    resultManagerService.prepareResultText(76);

    expect(translate.instant.withArgs('evaluationResult.riskExtreme')).to.be.calledOnce;
  });

  it('should prepare result text for high risk result', () => {
    resultManagerService.prepareResultText(56);

    expect(translate.instant.withArgs('evaluationResult.riskHigh')).to.be.calledOnce;
  });

  it('should prepare result text for medium risk result', () => {
    resultManagerService.prepareResultText(38);

    expect(translate.instant.withArgs('evaluationResult.riskMedium')).to.be.calledOnce;
  });

  it('should prepare result text for low risk result', () => {
    resultManagerService.prepareResultText(0);

    expect(translate.instant.withArgs('evaluationResult.riskLow')).to.be.calledOnce;
  });
});
