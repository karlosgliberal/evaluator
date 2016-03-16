import formServices from './form.services.js';
import cowFormServices from '../AnimalFormsServices/cowForm.services';

describe('form service', () => {

  var formService, cowFormServiceSpy;

  beforeEach(angular.mock.module(cowFormServices.name, ($provide) => {
    cowFormServiceSpy = {generateCowForm: sinon.spy()};
    $provide.value("cowFormService", cowFormServiceSpy);
  }));

  beforeEach(angular.mock.module(formServices.name));

  beforeEach(inject((_formService_)=> {
    formService = _formService_;
  }));

  it('should fetch form initial fields', () => {
    formService.getFormFields();
    expect(formService.cowFormService.generateCowForm).to.be.called.once;
  })
});

function firstModelFields() {
  return [
    {
      key: 'type1name',
      type: 'inline-input',
      templateOptions: {
        type: 'text',
        label: 'Type 1 name'
      }
    }
  ];
};

function secondModelFields() {
  return [
    {
      key: 'type2name',
      type: 'inline-input',
      templateOptions: {
        type: 'text',
        label: 'Type 2 name'
      }
    }
  ];
}