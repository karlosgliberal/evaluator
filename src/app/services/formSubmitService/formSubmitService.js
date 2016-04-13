import animals from './../../utils/animal';
import {assign} from 'lodash';

const baseSumValue = 25;

export default class formSubmitService {
  /*@ngInject*/
  constructor(animalFieldsManager, localStorageManager) {
    assign(this, {animalFieldsManager, localStorageManager});
  };

  processData(animal, selector, fields) {
    var flattenedList = this.flattenFieldList(fields);
    var allFieldsList = this.getAnimalFields(animal, selector);
    var evaluationResult = this.performEvaluation(flattenedList, allFieldsList);
    var result = this.prepareResult(evaluationResult);
    this.saveData(result, animal, selector, fields);

    return result;
  }

  flattenFieldList(fieldsList) {
    var list = [];
    _.eachRight(fieldsList, (fields) => {
      _.each(fields, (value, field) => {
        if (value) {
          list.push(field);
        }
      });
    });
    return list;
  }

  getAnimalFields(animal, selector) {
    return this.animalFieldsManager.getFieldsFor(animal, selector);
  };

  performEvaluation(flattenedList, allFields) {
    var sum = 0;
    _.each(flattenedList, (field) => {
      if (allFields[field]) {
        sum = sum + allFields[field];
      }
    });

    return sum + baseSumValue;
  }

  prepareResult(evaluationResult) {
    if (evaluationResult > 95) {
      return 95;
    } else if (evaluationResult < 26) {
      return 25;
    }
    return _.round(evaluationResult);
  }

  saveData(result, animal, selector, fields) {
    var data = {};
    _.assign(data, {animal: animal});
    if (selector) {
      _.assign(data, {selector: selector});
    }
    _.assign(data, {fields: fields}, {result: result});

    this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(data));
  }
}
