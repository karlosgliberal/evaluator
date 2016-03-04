import formServices from '../../views/forms/form.services';

describe('User form service', () => {

  var formService;

  beforeEach(angular.mock.module(formServices.name));

  beforeEach(inject((_formService_)=> {
    formService = _formService_;
  }));

  describe('user form service', function () {
    it('should fetch form initial fields', () => {
      expect(formService.getFormFields()).to.be.ok;
    })

    it('should return type1 fields', () => {
      expect(formService.changeFormFieldsForValues('::state::', 'type1')[1]).to.eql(firstModelFields('::state::')[0]);
    })

    it('should return type2 fields', () => {
      expect(formService.changeFormFieldsForValues('::state::', 'type2')[1]).to.eql(secondModelFields('::state::')[0]);
    })
  })
});

function firstModelFields(state) {
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

function secondModelFields(state) {
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