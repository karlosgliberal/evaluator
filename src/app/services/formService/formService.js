import { assign } from 'lodash';
import animal from '../../utils/animal';
import language from '../../utils/language';

export default class formService {
  /*@ngInject*/
  constructor(cowFormService, swineFormService, poultryFormService, languageFormService) {
    assign(this, {cowFormService, swineFormService, poultryFormService, languageFormService});
  };

  getFormSelector(selectedAnimal, state) {
    if (selectedAnimal === animal.POULTRY) {
      return this.poultryFormService.generateFormSelector(state);
    }

    return [];
  };

  getFormRadio(selectedAnimal, state) {
    return this.languageFormService.generateFormRadio(state);
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
