import evaluationResultControllers from './evaluationResult.controllers';
import formPartsControllers from './../../services/formPartsBuilderService/formPartsBuilder.services';
import reportManagerService from './../../services/reportManagerService/reportManager.services';

import animals from './../../utils/animal';

var controller, scope, formPartBuildServiceSpy, reportManagerServiceStub, form, stateParams, $compile, directiveHTML;

describe('Idioma controller', () => {

  beforeEach(angular.mock.module(formPartsControllers.name));

  beforeEach(angular.mock.module(reportManagerService.name));

  beforeEach(angular.mock.module(evaluationResultControllers.name));

  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    stateParams = {animal: animals.COW, result: 5};
    formPartBuildServiceSpy = {buidInputEmailFor: sinon.stub()};
    reportManagerServiceStub = {sendReport: sinon.stub()};

    prepareFormly();

    controller = $controller('evaluationResultController', {
      $stateParams: stateParams,
      formPartsBuilderService: formPartBuildServiceSpy,
      reportManagerService: reportManagerServiceStub
    });
  }));

  describe('form tests', () => {
    it('should call email input form', () => {
      scope.viewModel = {email: '::email::'};

      expect(formPartBuildServiceSpy.buidInputEmailFor).to.be.called.once;
    });

    //it('should have compiled input text', function () {
    //  console.log($compile);
    //  expect($compile.find('input').length).to.equal(1);
    //});

    //it.only('should verify email', () => {
    //  scope.viewModel = {email: '::email::'};
    //
    //  controller.onSubmit();
    //
    //  expect(reportManagerServiceSpy.sendReport).to.not.be.called.once;
    //});

    //it.only('should verify email and send report', () => {
    //  scope.viewModel = {email: 'email@email.com'};
    //
    //  controller.onSubmit();
    //
    //  expect(reportManagerServiceSpy.sendReport.withArgs(animals.COW, 5, 'email@email.com')).to.be.called.once;
    //});
  });

  //describe('report send response', () => {
  //  it('should show success message', () => {
  //    reportManagerServiceStub.returns({result: 'ok'})
  //  });
  //});
});

function prepareFormly() {
  scope.viewModel = {};
  scope.fields = [{
    key: 'email',
    type: 'stacked-input',
    templateOptions: {
      type: 'email',
      label: 'Email',
      placeholder: 'Email'
    }
  }];

  directiveHTML =
      '<form novalidate>' +
      '<formly-form form="form" model="scope.viewModel" fields="scope.fields">' +
      '</form>';

  $compile = $compile(directiveHTML)(scope);
  scope.$digest();
}