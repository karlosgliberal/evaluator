import formServices from './form.services.js';
import cowFormServices from '../animalFormsServices/cow/cowForm.services.js';
import swineFormServices from '../animalFormsServices/swine/swineForm.services.js';
import poultryFormServices from '../animalFormsServices/poultry/poultryForm.services.js';
import languageFormServices from '../languageFormService/languageForm.services';
import animal from '../../utils/animal.js';
import poultry from '../../utils/poultry.js';
import language from '../../utils/language.js';

describe('form service', () => {

  var formService, cowFormServiceSpy, swineFormServiceSpy, poultryFormServiceSpy, languageFormServiceSpy;

  beforeEach(angular.mock.module(poultryFormServices.name, ($provide) => {
    poultryFormServiceSpy = {generateForm: sinon.spy(), generateFormSelector: sinon.spy()};
    $provide.value('poultryFormService', poultryFormServiceSpy);
  }));

  beforeEach(angular.mock.module(cowFormServices.name, ($provide) => {
    cowFormServiceSpy = {generateForm: sinon.spy()};
    $provide.value('cowFormService', cowFormServiceSpy);
  }));

  beforeEach(angular.mock.module(swineFormServices.name, ($provide) => {
    swineFormServiceSpy = {generateForm: sinon.spy()};
    $provide.value('swineFormService', swineFormServiceSpy);
  }));

  beforeEach(angular.mock.module(languageFormServices.name, ($provide) => {
    languageFormServiceSpy = {generateFormRadio: sinon.spy()};
    $provide.value('languageFormService', languageFormServiceSpy);
  }));

  beforeEach(angular.mock.module(formServices.name));

  beforeEach(inject((_formService_)=> {
    formService = _formService_;
  }));

  it('should fetch cow form initial fields', () => {
    formService.getFormFields(animal.COW);
    expect(formService.cowFormService.generateForm).to.be.called.once;
  });

  it('should fetch swine form initial fields', () => {
    formService.getFormFields(animal.SWINE);
    expect(formService.swineFormService.generateForm).to.be.called.once;
  });

  it('should fetch poultry form initial fields', () => {
    formService.getFormFields(animal.POULTRY);
    expect(formService.poultryFormService.generateForm).to.be.called.once;
  });

  it('should fetch poultry form selector for poultry', () => {
    formService.getFormSelector(animal.POULTRY);
    expect(formService.poultryFormService.generateFormSelector).to.be.called.once;
  });

  it('should fetch language radio form list', () => {
    formService.getFormRadio(language);
    expect(formService.languageFormService.generateFormRadio).to.be.called.once;
  });

  it('should not return selector fields for animals that are not poultry', () => {
    expect(formService.getFormSelector(animal.COW)).to.be.empty;
  });

  it('should fetch new form fields', () => {
    formService.changeFormFieldsFor(poultry.BREEDER);
    expect(poultryFormServiceSpy.generateForm).to.be.calledWith(poultry.BREEDER);
  });

});
