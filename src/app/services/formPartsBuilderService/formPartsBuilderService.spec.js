import formPartsBuilderServices from './formPartsBuilder.services';

describe('form parts builder service', () => {

  var formPartsBuilderService, translateStub;

  beforeEach(angular.mock.module(formPartsBuilderServices.name, ($provide) => {
    translateStub = {instant: sinon.stub()};
    $provide.value("$translate", translateStub);
  }));

  beforeEach(angular.mock.module(formPartsBuilderServices.name));

  beforeEach(inject((_formPartsBuilderService_)=> {
    formPartsBuilderService = _formPartsBuilderService_;
  }));

  it('should build checkbox', () => {
    expect(formPartsBuilderService.buildCheckboxFor('::fieldName::', '::fieldGroup::')).to.be.eql(checboxField('::fieldName::'));
  });

  it('should build field group with single element in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildCheckboxFor');
    var fieldGroup = formPartsBuilderService.buildFieldGroupFor({'::fieldName1::': 1}, '::fieldGroup::');

    expect(spy.withArgs('::fieldName1::', '::fieldGroup::').callCount).to.be.equal(1);
    expect(fieldGroup[0]).to.be.eql(checboxField('::fieldName1::'));
  });

  it('should build field group with multiple elements in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildCheckboxFor');
    var fieldGroup = formPartsBuilderService.buildFieldGroupFor({
      '::fieldName1::': 1,
      '::fieldName2::': 2
    }, '::fieldGroup::');

    expect(spy.callCount).to.be.equal(2);
    expect(spy.withArgs('::fieldName1::', '::fieldGroup::').callCount).to.be.equal(1);
    expect(spy.withArgs('::fieldName2::', '::fieldGroup::').callCount).to.be.equal(1);
    expect(fieldGroup[0]).to.be.eql(checboxField('::fieldName1::'));
    expect(fieldGroup[1]).to.be.eql(checboxField('::fieldName2::'));
  });

  it('should build choice list', () => {
    var choiceList = formPartsBuilderService.buildChoiceListFor(['::first::', '::second::', '::third::']);

    expect(choiceList.length).to.be.equal(3);
    expect(choiceList[0]).to.have.property('id', '::first::');
    expect(choiceList[1]).to.have.property('id', '::second::');
    expect(choiceList[2]).to.have.property('id', '::third::');
  });

  it('should build wrapper with single fields in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildFieldGroupFor');

    formPartsBuilderService.buildWrapperFor('::labelReference::', '::key::', ['::field::']);

    expect(spy.withArgs(['::field::'], '::key::.fields.').callCount).to.be.equal(1);
  });

  it('should build wrapper with multiple fields in list', () => {
    var spy = sinon.spy(formPartsBuilderService, 'buildFieldGroupFor');

    formPartsBuilderService.buildWrapperFor('::labelReference::', '::key::', ['::field1::', '::field2::']);

    expect(spy.withArgs(['::field1::', '::field2::'], '::key::.fields.').callCount).to.be.equal(1);
  });

  it('should build wrapper for selector', () => {
    var stub = sinon.stub(formPartsBuilderService, 'buildChoiceListFor');
    formPartsBuilderService.buildSelectorFor('::labelReference::', '::key::', ['::first::', '::second::'], undefined);

    expect(stub.withArgs(['::first::', '::second::']).callCount).to.be.equal(1);
  });
});

function checboxField(fieldName) {
  return {
    type: 'checkbox',
    key: fieldName,
    templateOptions: {
      label: undefined
    }
  };
}
