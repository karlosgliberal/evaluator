import animalSelectionControllers from './animalSelection.controllers';
import animal from '../../utils/animal';


var controller, stateSpy, translateStub, availableAnimalsSpy;

describe('animal controller selection', () => {

  beforeEach(angular.mock.module(animalSelectionControllers.name, ($provide) => {
    translateStub = {use: sinon.stub()};
    $provide.value('$translate', translateStub);
  }));

  beforeEach(angular.mock.module(animalSelectionControllers.name));

  beforeEach(inject(($controller) => {
    stateSpy = {
      $state: {
        go: sinon.spy()
      }
    };
    controller = $controller('animalSelectionController', {
      $state: stateSpy.$state,
      $translate: translateStub
    });
  }));

  it('should transition to cow form', () => {
    controller.onAnimalSelection(animal.COW);

    expect(stateSpy.$state.go).to.have.been.called.once;
    expect(stateSpy.$state.go).to.have.been.calledWith('form', {animal: 'cow'});
  });

  it('should transition to swine form', () => {
    controller.onAnimalSelection(animal.SWINE);

    expect(stateSpy.$state.go).to.have.been.called.once;
    expect(stateSpy.$state.go).to.have.been.calledWith('form', {animal: 'swine'});
  });

  it('should transition to cow form', () => {
    controller.onAnimalSelection(animal.POULTRY);

    expect(stateSpy.$state.go).to.have.been.called.once;
    expect(stateSpy.$state.go).to.have.been.calledWith('form', {animal: 'poultry'});
  });
});
