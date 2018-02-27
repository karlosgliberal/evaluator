import swineFormServices from './swineForm.services.js';
import App from '../../../app';
import swineFields from '../../../utils/fields/swineFields';
import formPartsBuilderServices from '../../formPartsBuilderService/formPartsBuilder.services'

const labelReferenceBase = 'forms.swine.';

describe('Swine form service', () => {

  var swineFormService, formPartsBuilderServiceSpy;

  beforeEach(angular.mock.module(formPartsBuilderServices.name, ($provide) => {
    formPartsBuilderServiceSpy = {buildWrapperFor: sinon.spy()};
    $provide.value('formPartsBuilderService', formPartsBuilderServiceSpy);
  }));

  beforeEach(angular.mock.module(swineFormServices.name));

  beforeEach(inject((_swineFormService_)=> {
    swineFormService = _swineFormService_;
  }));

  it('should call herd wrappers', () => {
    swineFormService.generateForm();

    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledTwice;
    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledWith(labelReferenceBase, 'animal', swineFields.swineOnAnimalFieldsList());
    expect(formPartsBuilderServiceSpy.buildWrapperFor).to.be.calledWith(labelReferenceBase, 'feed', swineFields.swineOnFeedFieldsList());
  });
});

function checkboxField() {
  return {
    type: 'checkbox',
    key: '::fieldName::',
    templateOptions: {
      label: '::fieldName::'
    }
  };
}

function checkboxFieldList() {
  return [
    {
      type: 'checkbox',
      key: '::field1::',
      templateOptions: {}
    },
    {
      type: 'checkbox',
      key: '::field2::',
      templateOptions: {}
    }
  ];
}
