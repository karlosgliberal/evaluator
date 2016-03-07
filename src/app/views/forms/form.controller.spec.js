import formControllers from './form.controllers';
var sandbox, scope, formServiceSpy, form, $compile, directiveHTML;

describe('user from controller', () => {

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(angular.mock.module(formControllers.name));

  beforeEach(inject(($controller, $rootScope, _$compile_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();

    formServiceSpy = {getFormFields: sandbox.spy(), getFormFieldsChange: sandbox.spy()};

    $controller('formController', {
      formService: formServiceSpy
    });
    prepareFormly();
  }));

  describe('form and fields construction', function () {
    it('should have compiled input text', function () {
      expect($compile.find('select').length).to.equal(1);
      expect($compile.find('input').length).to.equal(2);
    });

    it('should have empty scope model', function () {
      expect(scope.model).to.eql({typeSelector: 'carnívoros'});
    });
  });

  describe('form base change', function () {
    it('should ask field form change', function () {
      //TODO
    });

    describe('form fields request', function () {
      it('should get form fields', () => {
        expect(formServiceSpy.getFormFields).to.have.been.called.once;
      });
    });
  });
});

function prepareFormly() {
  scope.model = {};

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
      labelProp: 'label',
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
      '<formly-form form="form" model="model" fields="fields">' +
      '</form>';

  $compile = $compile(directiveHTML)(scope);
  scope.$digest();
}

