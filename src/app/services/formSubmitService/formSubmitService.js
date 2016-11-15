import animals from './../../utils/animal';
import {assign} from 'lodash';

const baseSumValue = 25;

export default class formSubmitService {
  /*@ngInject*/
  constructor(animalFieldsManager, localStorageManager, resultManager, networkManagerService, $translate) {
    assign(this, {
      animalFieldsManager,
      localStorageManager,
      resultManager,
      networkManagerService,
      $translate});
  };

  processData(animal, selector, fields) {
    var result = {};
    var flattenedList = this.flattenFieldList(fields);
    var allFieldsList = this.getAnimalFields(animal, selector);
    var evaluationResult = this.performEvaluation(flattenedList, allFieldsList);
    var resultPercentage = this.resultManager.prepareResultPercentage(evaluationResult);
    var resultText = this.resultManager.prepareResultText(evaluationResult);
    var footerPdf = this.$translate.instant('evaluationResult.footerPdf');
    var footerEmail = this.$translate.instant('evaluationResult.footerEmail');
    var animalTrans = this.$translate.instant('animal.' + animal);
    var bodyText = this.$translate.instant('evaluationResult.bodyText');

    var data = this.makeData(result, animal, selector, fields);
    _.assign(result, {
      porcentaje: resultPercentage},
      {animal: animalTrans},
      {resultTexto: resultText},
      {datos: data},
      {footerPdf: footerPdf},
      {footerEmail: footerEmail},
      {bodyText: bodyText}
    );
    return result;
  }

  saveData(data){
    this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(data));
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

  //TODO Se tiene que llevar al servicio translate
  makeData(result, animal, selector, fields) {
    let labelBase = 'forms.';
    let data = {};
    let lista = [];
    let listaTraduciones = {};

    _.assign(data, {animal: animal});
    if (selector) {
      _.assign(data, {selector: selector});
    }
    _.assign(data, {fields: fields}, {result: result});

    let keys = _.keysIn(data.fields);
    _.forEach(keys, (key) => {
      if (!_.isEmpty(data.fields[key])) {
        let secondKeys = _.keysIn(data.fields[key]);
        _.forEach(secondKeys, (secondKey, i) => {
          console.log(data.animal);
          if (data.animal === 'dairy') {
            data.animal = 'cow';
          }
          let grupo = this.$translate.instant(labelBase + data.animal + '.' + key + '.title');
          let trans = this.$translate.instant('forms.' + data.animal + '.' + key + '.fields.' + secondKey);
          lista.push({grupo: grupo, traduccion: trans});
        });
      }
    });
    _.assign(data, {traducciones: lista});
    return lista;
    //this.localStorageManager.save('Evaluation-' + Date.now(), JSON.stringify(data));
  }
}
