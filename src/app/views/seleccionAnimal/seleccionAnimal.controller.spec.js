import seleccionAnimalControllers from './seleccionAnimal.controllers';
import animal from '../../utils/animal';


var controller, stateSpy;

describe('seleccion animal controller', () => {

  beforeEach(angular.mock.module(seleccionAnimalControllers.name));

  beforeEach(inject(($controller) => {
    stateSpy = {
      $state: {
        go: sinon.spy()
      }
    };

    controller = $controller('SeleccionAnimalController', {
      $state: stateSpy.$state
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
})
