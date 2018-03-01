import formPartsBuilderServices from './formPartsBuilder.services';

describe('Form parts builder service', () => {

  var formPartsBuilderService, translateStub;

  beforeEach(angular.mock.module(formPartsBuilderServices.name, ($provide) => {
    translateStub = {instant: sinon.stub()};
    $provide.value('$translate', translateStub);
  }));

  beforeEach(angular.mock.module(formPartsBuilderServices.name));

  beforeEach(inject((_formPartsBuilderService_)=> {
    formPartsBuilderService = _formPartsBuilderService_;
  }));

  it('should build checkbox', () => {
    expect(formPartsBuilderService.buildCheckboxFor('::fieldName::', '::fieldGroup::')).to.be.eql(checkboxField('::fieldName::'));
  });

  it('should build field group with single element in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildCheckboxFor');
    var fieldGroup = formPartsBuilderService.buildFieldGroupFor({'::fieldName1::': 1}, '::fieldGroup::');

    expect(spy.withArgs('::fieldName1::', '::fieldGroup::')).to.be.calledOnce;
    expect(fieldGroup[0]).to.be.eql(checkboxField('::fieldName1::'));
  });

  it('should build field group with multiple elements in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildCheckboxFor');
    var fieldGroup = formPartsBuilderService.buildFieldGroupFor({
      '::fieldName1::': 1,
      '::fieldName2::': 2
    }, '::fieldGroup::');

    expect(spy.callCount).to.be.equal(2);
    expect(spy.withArgs('::fieldName1::', '::fieldGroup::')).to.be.calledOnce;
    expect(spy.withArgs('::fieldName2::', '::fieldGroup::')).to.be.calledOnce;
    expect(fieldGroup[0]).to.be.eql(checkboxField('::fieldName1::'));
    expect(fieldGroup[1]).to.be.eql(checkboxField('::fieldName2::'));
  });

  it('should build choice list', () => {
    var choiceList = formPartsBuilderService.buildChoiceListFor(['::first::', '::second::', '::third::']);

    expect(choiceList.length).to.be.equal(3);
    expect(choiceList[0]).to.have.property('value', '::first::');
    expect(choiceList[1]).to.have.property('value', '::second::');
    expect(choiceList[2]).to.have.property('value', '::third::');
  });

  it('should build wrapper with single fields in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildFieldGroupFor');

    formPartsBuilderService.buildWrapperFor('::labelReference::', '::key::', ['::field::']);

    expect(spy.withArgs(['::field::'], '::key::.fields.')).to.be.calledOnce;
  });

  it('should build wrapper with multiple fields in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildFieldGroupFor');

    formPartsBuilderService.buildWrapperFor('::labelReference::', '::key::', ['::field1::', '::field2::']);

    expect(spy.withArgs(['::field1::', '::field2::'], '::key::.fields.')).to.be.calledOnce;
  });

  it('should build wrapper for selector', () => {
    var stub = sinon.stub(formPartsBuilderService, 'buildChoiceListFor');
    formPartsBuilderService.buildSelectorFor('::labelReference::', '::key::', ['::first::', '::second::'], undefined);

    expect(stub.withArgs(['::first::', '::second::'])).to.be.calledOnce;
  });

  it('should build wrapper for radio button', () => {
    var stub = sinon.stub(formPartsBuilderService, 'buildRadioChoiceListFor');
    formPartsBuilderService.buildRadioFor('::labelReference::', '::key::', ['::first::', '::second::'], undefined);

    expect(stub.withArgs(['::first::', '::second::'])).to.be.calledOnce;
  });
});

function checkboxField(fieldName) {
  return {
    type: 'checkbox',
    key: fieldName,
    templateOptions: {
      label: undefined
    }
  };
}
