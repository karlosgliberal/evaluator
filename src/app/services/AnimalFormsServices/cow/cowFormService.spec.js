import cowFormServices from './cowForm.services.js';
import App from '../../../app';

const labelReferenceBase = 'forms.cow.herd.fields.';


describe('cow form service', () => {

  var cowFormService, translateStub;

  beforeEach(angular.mock.module(cowFormServices.name, ($provide) => {
    translateStub = {instant: sinon.stub()};
    $provide.value("$translate", translateStub);
  }));

  beforeEach(angular.mock.module(cowFormServices.name));

  beforeEach(inject((_cowFormService_)=> {
    cowFormService = _cowFormService_;
  }));

  it('should create checkbox field', () => {
    expect(cowFormService.createCheckbox('::fieldName::').key).to.be.equal(checboxField().key);
  });

  it('should return checkboxList from field list', () => {
    expect(cowFormService.createFieldGroup(['::field1::', '::field2::'])[0].key).to.be.equal(checkBoxFieldList()[0].key);
    expect(cowFormService.createFieldGroup(['::field1::', '::field2::'])[1].key).to.be.equal(checkBoxFieldList()[1].key);
  });

  it('should call field group generation', () => {
    //TODO
    //expect(cowFormService.createFieldGroup(any)).to.be.called.once;
  });
});

function checboxField() {
  return {
    type: 'checkbox',
    key: '::fieldName::',
    templateOptions: {
      label: '::fieldName::'
    }
  };
}

function checkBoxFieldList() {
  return [{
    type: 'checkbox',
    key: '::field1::',
    templateOptions: {}
  },
    {
      type: 'checkbox',
      key: '::field2::',
      templateOptions: {}
    }
  ]
}