import formControllers from './form.controllers';
import animal from '../../utils/animal.js';
import poultry from '../../utils/poultry.js';

var controller, scope, formServiceSpy, form, $compile, directiveHTML, stateParamsStub, formSubmitSpy;

describe('Form controller', () => {

  beforeEach(angular.mock.module(formControllers.name));

  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    stateParamsStub = {animal: animal.SWINE};
    formServiceSpy = {getFormFields: sinon.spy(), getFormSelector: sinon.spy(), changeFormFieldsFor: sinon.spy()};
    formSubmitSpy = {processData: sinon.spy()};

    prepareFormly();

    controller = $controller('formController', {
      formService: formServiceSpy,
      $stateParams: stateParamsStub,
      formSubmitService: formSubmitSpy
    });
  }));

  describe('form and fields construction', function () {
    it('should have compiled input text', function () {
      expect($compile.find('select').length).to.equal(1);
      expect($compile.find('input').length).to.equal(2);
    });

    it('should have not empty scope model', function () {
      expect(scope.viewModel).to.eql({typeSelector: 'carnívoros'});
    });
  });

  describe('form interaction', function () {
    it('should get form fields', () => {
      expect(formServiceSpy.getFormSelector).to.be.calledWith(stateParamsStub.animal);
      expect(formServiceSpy.getFormFields).to.be.calledWith(stateParamsStub.animal);
    });

    it('should ask field form change', function () {
      controller.selectorViewModel = {selector: poultry.BROILER};
      scope.$digest();
      controller.onSelectorChange();
      expect(formServiceSpy.changeFormFieldsFor.withArgs(poultry.BROILER).callCount).to.be.equal(1);
    });

    it('should ask submit service to process data', () => {
      controller.viewModel = {';;field1::': true, '::field2::': true};
      controller.selectorViewModel = {};
      scope.$digest();

      controller.onSubmit();

      expect(formSubmitSpy.processData.withArgs(animal.SWINE, undefined, {
        ';;field1::': true,
        '::field2::': true
      }).callCount).to.be.equal(1);
    })
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
    },
  },
    {
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
