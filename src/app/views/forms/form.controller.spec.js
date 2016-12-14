import formControllers from './form.controllers';
import animal from '../../utils/animal.js';
import poultry from '../../utils/poultry.js';
import { assign } from 'lodash';

var controller, scope, formServiceSpy, $compile, directiveHTML, stateParamsStub, formSubmitSpy, stateSpy, ionicHistorySpy;

describe('Form controller', () => {

  beforeEach(angular.mock.module(formControllers.name));
  beforeEach(angular.mock.module(ionic));
  
  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    ionicHistorySpy = {clearHistory: sinon.spy()};
    stateParamsStub = {animal: animal.SWINE};
    formServiceSpy = {getFormFields: sinon.spy(), getFormSelector: sinon.spy(), changeFormFieldsFor: sinon.spy()};
    formSubmitSpy = {processData: sinon.stub()};

    formSubmitSpy.processData.withArgs(animal.SWINE, undefined, {
      ';;field1::': true,
      '::field2::': true
    }).returns(6);
    stateSpy = {
      $state: {
        go: sinon.spy()
      }
    };
    prepareFormly();

    controller = $controller('formController', {
      $state: stateSpy.$state,
      formService: formServiceSpy,
      $stateParams: stateParamsStub,
      formSubmitService: formSubmitSpy,
      $ionicHistory: ionicHistorySpy
    });
  }));

  describe('form and fields construction', () => {
    it('should have compiled input text', () => {
      expect($compile.find('select').length).to.equal(1);
      expect($compile.find('input').length).to.equal(2);
    });

    it('should have not empty scope model', () => {
      expect(scope.viewModel).to.eql({typeSelector: 'carnívoros'});
    });
  });

  describe('form interaction', () => {
    it('should get form fields', () => {
      expect(formServiceSpy.getFormSelector).to.be.calledWith(stateParamsStub.animal);
      expect(formServiceSpy.getFormFields).to.be.calledWith(stateParamsStub.animal);
    });

    it('should ask field form change', () => {
      controller.selectorViewModel = {selector: poultry.BROILER};
      scope.$digest();
      controller.onSelectorChange();
      expect(formServiceSpy.changeFormFieldsFor.withArgs(poultry.BROILER).callCount).to.be.equal(1);
    });

    it('should ask submit service to process data', () => {
      controller.viewModel = {';;field1::': true, '::field2::': true};
      controller.selectorViewModel = {};
      this.$ionicHistory.clearHistory();

      console.log(this);
      controller.onSubmit();

      expect(formSubmitSpy.processData.withArgs(animal.SWINE, undefined, {
        ';;field1::': true,
        '::field2::': true
      }).callCount).to.be.equal(1);
    });
    it('should got to evaluation result view', () => {
      controller.viewModel = {';;field1::': true, '::field2::': true};
      controller.onSubmit();

      expect(stateSpy.$state.go).to.have.been.calledWith('evaluationResult', {animal: 'swine', result: 6});
    });
  });
});

function prepareFormly() {
  scope.viewModel = {};
  scope.selectorViewModel = {};

  scope.fields = [{
    key: 'typeSelector',
    type: 'select',
    defaultValue: 'carnívoros',
    templateOptions: {
      onChange: function () {
        $controller.onFormBaseChange();
      },
      label: 'Tipo de pollo',
      options: [{
        label: 'Pollos carnívoros',
        id: 'carnívoros'
      }, {
        label: 'Pollos modelos',
        id: 'modelos'
      }],
      valueProp: 'id',
      labelProp: 'label'
    }
  }, {
    key: 'username',
    type: 'inline-input',
    templateOptions: {
      type: 'text',
      label: 'Username'
    }
  }, {
    key: 'password',
    type: 'inline-input',
    templateOptions: {
      type: 'password',
      label: 'Password'
    }
  }
  ];

  directiveHTML =
      '<form novalidate>' +
      '<formly-form form="form2" model="selectorViewModel" fields="selector">' +
      '</form>' +
      '<form novalidate>' +
      '<formly-form form="form" model="viewModel" fields="fields">' +
      '</form>';

  $compile = $compile(directiveHTML)(scope);
  scope.$digest();
}
