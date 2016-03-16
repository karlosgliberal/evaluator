import formServices from './form.services.js';
import cowFormServices from '../AnimalFormsServices/cow/cowForm.services.js';
import swineFormServices from '../AnimalFormsServices/swine/swineForm.services.js';
import animal from '../../utils/animal.js';

describe('form service', () => {

  var formService, cowFormServiceSpy, swineFormServiceSpy, stateParamsSpy;

  beforeEach(angular.mock.module(cowFormServices.name, ($provide) => {
    cowFormServiceSpy = {generateForm: sinon.spy()};
    $provide.value("cowFormService", cowFormServiceSpy);
  }));

  beforeEach(angular.mock.module(swineFormServices.name, ($provide) => {
    swineFormServiceSpy = {generateForm: sinon.spy()};
    $provide.value("swineFormService", swineFormServiceSpy);
  }));

  beforeEach(angular.mock.module(formServices.name));

  beforeEach(inject((_formService_)=> {
    formService = _formService_;
  }));

  it('should fetch cow form initial fields', () => {
    formService.getFormFields(animal.COW);
    expect(formService.cowFormService.generateForm).to.be.called.once;
  })

  it('should fetch swine form initial fields', () => {
    formService.getFormFields(animal.SWINE);
    expect(formService.swineFormService.generateForm).to.be.called.once;
  })
});
