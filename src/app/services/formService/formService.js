import { assign } from 'lodash';
import animal from '../../utils/animal';

export default class formService {
  /*@ngInject*/
  constructor(cowFormService, swineFormService, poultryFormService) {
    assign(this, {cowFormService, swineFormService, poultryFormService});
  };

  getFormSelector(selectedAnimal, state) {
    if (selectedAnimal === animal.POULTRY) {
      return this.poultryFormService.generateFormSelector(state);
    }
  };

  getFormFields(selectedAnimal) {
    if (selectedAnimal === animal.COW) {
      return this.cowFormService.generateForm();
    } else if (selectedAnimal === animal.POULTRY) {
      return this.poultryFormService.generateForm();
    }
    return this.swineFormService.generateForm();
  };

  changeFormFieldsFor(animalSpecie) {
    return this.poultryFormService.generateForm(animalSpecie);
  };
}
