import formSubmitServices from './formSubmit.services.js';
import animal from './../../utils/animal';
import poultry from './../../utils/poultry';
import animalFieldsManager from '../animalFieldsManagerService/animalFieldsManager.services';
import localStorageManager from '../localStorageManagerService/localStorageManager.services';
import resultManagerServices from '../resultManagerService/resultManager.services';


describe('form service', () => {

  var formSubmitService, animalFieldsManagerSpy, localStorageManagerSpy, resultMangerSpy, resultTextMangerSpy;


  var sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  beforeEach(angular.mock.module(localStorageManager.name, ($provide) => {
    localStorageManagerSpy = {save: sinon.spy()};
    $provide.value('localStorageManager', localStorageManagerSpy);
  }));

  beforeEach(angular.mock.module(resultManagerServices.name, ($provide) => {
    resultMangerSpy = {prepareResultPercentage: sinon.spy()};
    $provide.value('resultManager', resultMangerSpy);
  }));

  beforeEach(angular.mock.module(animalFieldsManager.name, ($provide) => {
    animalFieldsManagerSpy = {getFieldsFor: sinon.stub()};
    $provide.value('animalFieldsManager', animalFieldsManagerSpy);
  }));

  beforeEach(angular.mock.module(formSubmitServices.name));

  beforeEach(inject((_formSubmitService_)=> {
    Object.defineProperty(sessionStorage, 'setItem', {writable: true});

    formSubmitService = _formSubmitService_;
  }));

  // describe('data processor calls', () => {
  //   it('should make call process', () => {
  //     var fieldList = [{'herd': {'feed-intake': true, 'feed-intake': false}}, {'on-field': {'corn-fields': false}}];
  //     var flattenerStub = sandbox.stub(formSubmitService, 'flattenFieldList');
  //     var animalFieldsStub = sandbox.stub(formSubmitService, 'getAnimalFields');
  //     var performEvaluationStub = sandbox.stub(formSubmitService, 'performEvaluation');
  //     var prepareResultStub = sandbox.stub(formSubmitService, 'prepareResult');
  //     var dataSaveStub = sandbox.stub(formSubmitService, 'saveData');
  //
  //     flattenerStub.withArgs(fieldList).returns(['feed-intake']);
  //     animalFieldsStub.withArgs(animal.COW, undefined).returns({'body-condition': 5.9, 'feed-intake': 6.1});
  //     performEvaluationStub.withArgs(['feed-intake'], {'body-condition': 5.9, 'feed-intake': 6.1}).returns(6.1);
  //     prepareResultStub.withArgs(6.1).returns(6);
  //     var dataProcessResult = formSubmitService.processData(animal.COW, undefined, fieldList);
  //
  //     expect(flattenerStub.withArgs(fieldList)).to.be.called.once;
  //     expect(animalFieldsStub.withArgs(animal.COW)).to.be.called.once;
  //     expect(performEvaluationStub.withArgs(['feed-intake'], {
  //       'body-condition': 5.9,
  //       'feed-intake': 6.1
  //     })).to.be.called.once;
  //     expect(prepareResultStub.withArgs(6.1)).to.be.called.once;
  //     expect(dataSaveStub.withArgs(6, animal.COW, undefined, fieldList)).to.be.called.once;
  //     expect(dataProcessResult).to.be.equal(6);
  //   });
  // });

  describe('processing actions', () => {
    it('should flatten fieldList', () => {
      var filteredFields = formSubmitService.flattenFieldList({
        herd: {
          'feed-intake': true,
          'body-condition': false
        }
      }, {'on-field': {'corn-fields': false}});

      expect(filteredFields).to.be.eql(['feed-intake']);
    });

    it('should call prepara service', () => {
      var fieldList = [
        {
          'herd': {
            'feed-intake': true,
          }
        }, {
          'on-field': {
            'corn-fields': false
          }
        }];
      formSubmitService.processData(animal.COW, fieldList);

      expect(resultMangerSpy.prepareResultPercentage.withArgs(6).callCount).to.be.equal(1);
    });

    it('should get Cow fields', () => {
      formSubmitService.getAnimalFields(animal.COW);

      expect(animalFieldsManagerSpy.getFieldsFor.withArgs(animal.COW).callCount).to.be.equal(1);
    });

    it('should get Swine fields', () => {
      formSubmitService.getAnimalFields(animal.SWINE);

      expect(animalFieldsManagerSpy.getFieldsFor.withArgs(animal.SWINE).callCount).to.be.equal(1);
    });

    it('should get Poultry breeder fields', () => {
      formSubmitService.getAnimalFields(animal.POULTRY, poultry.BREEDER);

      expect(animalFieldsManagerSpy.getFieldsFor.withArgs(animal.POULTRY, poultry.BREEDER).callCount).to.be.equal(1);
    });

    it('should perform evaluation with matching elements', () => {
      var fieldsSum = formSubmitService.performEvaluation(['feed-intake', 'body-condition'], {
        'feed-intake': 4.2,
        'body-condition': 10.1,
        'body-weight': 8.2
      });

      expect(fieldsSum).to.be.equal(39.3);
    });

    it('should perform evaluation without matching elements', () => {
      var fieldsSum = formSubmitService.performEvaluation(['intake', 'condition'], {
        'feed-intake': 4.2,
        'body-condition': 10.2,
        'body-weight': 8.2
      });

      expect(fieldsSum).to.be.equal(25);
    });



    // it('should prepare the result', () => {
    //   var fieldsSum = formSubmitService.prepareResult(30);
    //
    //   expect(fieldsSum).to.be.equal(30);
    // });
    //
    // it('should prepare round the result', () => {
    //   var fieldsSum = formSubmitService.prepareResult(50.14);
    //
    //   expect(fieldsSum).to.be.equal(50);
    // });
    //
    // it('should prepare max result', () => {
    //   var fieldsSum = formSubmitService.prepareResult(115);
    //
    //   expect(fieldsSum).to.be.equal(95);
    // });
    //
    // it('should prepare min result', () => {
    //   var fieldsSum = formSubmitService.prepareResult(25);
    //
    //   expect(fieldsSum).to.be.equal(25);
    // });

    it('should save data', () => {
      var dataToSave = {
        animal: 'cow',
        selector: 'breeder',
        fields: undefined,
        result: 6
      };

      var clock = sinon.useFakeTimers(new Date(2016, 2, 15).getTime());
      clock.tick(60 * 60 * 2 * 1000);

      formSubmitService.saveData(6, animal.COW, poultry.BREEDER);

      expect(localStorageManagerSpy.save.withArgs('Evaluation-' + Date.now(), JSON.stringify(dataToSave)).callCount).to.be.equal(1);
    });
  });
});
