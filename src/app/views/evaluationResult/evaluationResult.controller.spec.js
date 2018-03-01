import evaluationResultControllers from './evaluationResult.controllers';
import reportManagerService from './../../services/reportManagerService/reportManager.services';
import animals from './../../utils/animal';
import languageFormServices from './../../services/languageFormService/languageForm.services';
import constantsService from '../../services/constants/constants.service';

var controller, scope, translateStub, reportManagerServiceStub, stateParams, $compile, languageFormServiceSpy;

describe('Evaluation result controller', () => {
  beforeEach(angular.mock.module(languageFormServices.name, ($provide) => {
    languageFormServiceSpy = {generateFormRadio: sinon.spy(), getTextImagen: sinon.spy()};
    $provide.value('languageFormService', languageFormServiceSpy);
  }));

  beforeEach(angular.mock.module(constantsService.name));

  beforeEach(angular.mock.module(reportManagerService.name));

  beforeEach(angular.mock.module(evaluationResultControllers.name));

  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    stateParams = {animal: animals.COW, result: 5};
    reportManagerServiceStub = {sendReport: sinon.stub()};
    controller = $controller('evaluationResultController', {
      $stateParams: stateParams,
      reportManagerService: reportManagerServiceStub,
      $translate: translateStub
    });

    controller.form = { $valid: true, $setPristine: sinon.stub(), $setUntouched: sinon.stub() };
  }));

  it('email pattern should not accept an invalid email', () => {
    const email = 'email@';
    const emailRegex = new RegExp(controller.emailPattern);

    const isValid = emailRegex.test(email);

    expect(isValid).to.be.false;
  });

  it('email pattern should not accept empty email', () => {
    const email = '';
    const emailRegex = new RegExp(controller.emailPattern);

    const isValid = emailRegex.test(email);

    expect(isValid).to.be.false;
  });

  it('email pattern should accept a valid email', () => {
    const email = 'email@email.com';
    const emailRegex = new RegExp(controller.emailPattern);

    const isValid = emailRegex.test(email);

    expect(isValid).to.be.true;
  });

  it('email pattern should accept some valid emails', () => {
    const email = 'email@email.com,email2@other.es';
    const emailRegex = new RegExp(controller.emailPattern);

    const isValid = emailRegex.test(email);

    expect(isValid).to.be.true;
  });

  it('should not send report when form is not valid', () => {
    controller.form = { $valid: false };

    controller.onSubmit();

    expect(reportManagerServiceStub.sendReport).to.not.be.called;
    expect(controller.validForm).to.be.false;
  });

  it('should send report and reset form when form is valid', done => {
    controller.email = 'email@email.com';
    reportManagerServiceStub.sendReport.returns(Promise.resolve());

    const onSubmitPromise = controller.onSubmit();

    onSubmitPromise.then(() => {
      expect(reportManagerServiceStub.sendReport.withArgs(animals.COW, 5, 'email@email.com')).to.be.calledOnce;
      expect(controller.form.$setPristine).to.be.calledOnce;
      expect(controller.form.$setUntouched).to.be.calledOnce;
      expect(controller.validForm).to.be.true;
      done();
    });
  });
});

