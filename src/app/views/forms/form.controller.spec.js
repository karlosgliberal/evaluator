import formControllers from './form.controllers';
import animal from '../../utils/animal.js';
import poultry from '../../utils/poultry.js';

var controller, scope, formServiceSpy, form, $compile, directiveHTML, stateParmsStub;

describe('Form controller', () => {

  beforeEach(angular.mock.module(formControllers.name));

  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    stateParmsStub = {animal : animal.SWINE};
    formServiceSpy = {getFormFields: sinon.spy(), getFormSelector: sinon.spy(), changeFormFieldsFor: sinon.spy()};

    prepareFormly();

    controller = $controller('formController', {
      formService: formServiceSpy,
      $stateParams: stateParmsStub
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
      expect(formServiceSpy.getFormSelector).to.be.calledWith(stateParmsStub.animal);
      expect(formServiceSpy.getFormFields).to.be.calledWith(stateParmsStub.animal);
    });
    it('should ask field form change', function () {
      //TODO
      //scope.selectorViewModel = {poultrySelector: poultry.BROILER};

      //scope.$digest();
      //controller.onSelectorChange();
      //expect(formServiceSpy.changeFormFieldsFor).to.be.calledWith(poultry.BROILER);
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
      '</form>'+
      '<form novalidate>' +
      '<formly-form form="form" model="viewModel" fields="fields">' +
      '</form>';

  $compile = $compile(directiveHTML)(scope);
  scope.$digest();
}

