import animals from './../../utils/animal';
import cowFields from './../../utils/fields/cowFields';
import swineFields from './../../utils/fields/swineFields';
import poultryFields from './../../utils/fields/poultryFields';

import {assign} from 'lodash';

export default class animalFieldsManager {
  /*@ngInject*/
  constructor($translate){
    assign(this, {$translate});
  };

  getFieldsFor(animal, specie) {
    if (animals.COW === animal) {
      return cowFields.getAllFieldsFor(this.$translate.use());
    } else if (animals.SWINE === animal) {
      return swineFields.getAllFields();
    }
    return poultryFields.getAllFieldsFor(specie);
  }
}
