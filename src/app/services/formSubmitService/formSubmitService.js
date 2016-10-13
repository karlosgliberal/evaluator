import animals from './../../utils/animal';
import {assign} from 'lodash';

const baseSumValue = 25;

export default class formSubmitService {
  /*@ngInject*/
  constructor(animalFieldsManager, localStorageManager, resultManager) {
    assign(this, {animalFieldsManager, localStorageManager, resultManager});
  };

  processData(animal, selector, fields) {
    var result = {};
    var flattenedList = this.flattenFieldList(fields);
    var allFieldsList = this.getAnimalFields(animal, selector);
    var evaluationResult = this.performEvaluation(flattenedList, allFieldsList);
    _.assign(result, {
      resultPercentage: this.resultManager.prepareResultPercentage(evaluationResult)
    }, {
      resultText: this.resultManager.prepareResultText(evaluationResult)
    });

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
