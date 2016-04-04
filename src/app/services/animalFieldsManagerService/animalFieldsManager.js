import animals from './../../utils/animal';
import cowFields from './../../utils/fields/cowFields';
import swineFields from './../../utils/fields/swineFields';
import poultryFields from './../../utils/fields/poultryFields';

export default class animalFieldsManager {

  getFieldsFor(animal, specie) {
    if (animals.COW === animal) {
      return cowFields.getAllFields();
    } else if (animals.SWINE === animal) {
      return swineFields.getAllFields();
    }
    return poultryFields.getAllFieldsFor(specie);
  }
}

