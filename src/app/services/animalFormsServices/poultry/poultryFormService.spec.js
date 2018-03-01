import poultryFormServices from './poultryForm.services.js';
import formPartsBuilderServices from '../../formPartsBuilderService/formPartsBuilder.services';
import poultryFields from '../../../utils/fields/poultryFields';
import poultry from '../../../utils/poultry';
import App from '../../../app';

describe('Poultry form service', () => {

  var poultryFormService, translateStub, formPartsBuilderServiceSpy;

  beforeEach(angular.mock.module(formPartsBuilderServices.name, ($provide) => {
    formPartsBuilderServiceSpy = {buildWrapperFor: sinon.spy(), buildSelectorFor: sinon.spy()};
    $provide.value('formPartsBuilderService', formPartsBuilderServiceSpy);
  }));

  beforeEach(angular.mock.module(poultryFormServices.name, ($provide) => {
    translateStub = {instant: sinon.stub()};
    $provide.value('$translate', translateStub);
  }));

  beforeEach(angular.mock.module(poultryFormServices.name));

  beforeEach(inject((_poultryFormService_)=> {
    poultryFormService = _poultryFormService_;
  }));

  it('should call breeders form generation', () => {
    var spy = sinon.spy(poultryFormService, 'generateLayingHensForm');

    poultryFormService.generateForm(poultry.HENS);

    expect(spy).to.be.calledOnce;
  });

  it('should call broilers form generation', () => {
    var spy = sinon.spy(poultryFormService, 'generateBroilerForm');

    poultryFormService.generateForm(poultry.BROILER);

    expect(spy).to.be.calledOnce;
  });

  it('should call breeder form generation', () => {
    var spy = sinon.spy(poultryFormService, 'generateBreederForm');

    poultryFormService.generateForm(poultry.BREEDER);

    expect(spy).to.be.calledOnce;
  });

  it('should return empty if no specie is defined', () => {
    var result = poultryFormService.generateForm();

    expect(result).to.be.eql('');
  });

  it('shoulw call poultry selector', () => {
    poultryFormService.generateFormSelector();

    expect(formPartsBuilderServiceSpy.buildSelectorFor).to.be.calledWith('forms.poultry.', 'selector', poultry, undefined);
  });
});
