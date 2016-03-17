import idiomaControllers from './idioma.controllers';

var controller, scope, formServiceSpy, idioma, directiveHTML, state, translateStub;

describe('Idioma controller', () => {

  beforeEach(angular.mock.module(idiomaControllers.name, 'pascalprecht.translate', 'ui.router'));

  beforeEach(inject(($controller, $rootScope, $translate, $state) => {
    scope = $rootScope.$new();
    formServiceSpy = {generateLanguageForm: sinon.spy()};

    controller = $controller('IdiomaController', {
      languageFormService: formServiceSpy,
      state: $state
    });
  }));

  describe('form interaction', function () {
    it('should get form fields', () => {
      expect(formServiceSpy.generateLanguageForm).to.have.been.called.once;
    });
  });
});
