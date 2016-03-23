import cowFormServices from './cowForm.services.js';
import App from '../../../app';
import cowFields from '../../../utils/fields/cowFields';
import formPartsBuilderServices from '../../formPartsBuilderService/formPartsBuilder.services'

const labelReferenceBase = 'forms.cow.';

describe('cow form service', () => {

  var cowFormService, translateStub, formPartsBuilderServiceSpy;

  beforeEach(angular.mock.module(formPartsBuilderServices.name, ($provide) => {
    formPartsBuilderServiceSpy = {buildWrapperFor: sinon.spy()};
    $provide.value("formPartsBuilderService", formPartsBuilderServiceSpy);
  }));

  beforeEach(angular.mock.module(cowFormServices.name, ($provide) => {
    translateStub = {instant: sinon.stub()};
    $provide.value("$translate", translateStub);
  }));

  beforeEach(angular.mock.module(cowFormServices.name));

  beforeEach(inject((_cowFormService_)=> {
    cowFormService = _cowFormService_;
  }));

  it('should call herd wrappers', () => {
    cowFormService.generateForm();

    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledThrice;
    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledWith(labelReferenceBase, 'herd', cowFields.cowHerdFieldsList());
    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledWith(labelReferenceBase, 'on-field', cowFields.cowOnFieldFieldsList());
    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledWith(labelReferenceBase, 'storage', cowFields.cowStorageFieldsList());
  });
});
