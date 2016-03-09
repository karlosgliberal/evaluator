import formServices from '../../views/forms/form.services';

describe('form service', () => {

  var formService;

  beforeEach(angular.mock.module(formServices.name));

  beforeEach(inject((_formService_)=> {
    formService = _formService_;
  }));

  it('should fetch form initial fields', () => {
    expect(formService.getFormFields()).to.be.ok;
  })

  it('should return type1 fields', () => {
    expect(formService.changeFormFieldsForValues('::state::', 'type1')[1]).to.eql(firstModelFields()[0]);
  })

  it('should return type2 fields', () => {
    expect(formService.changeFormFieldsForValues('::state::', 'type2')[1]).to.eql(secondModelFields()[0]);
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