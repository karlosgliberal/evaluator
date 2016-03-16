import seleccionAnimalControllers from './seleccionAnimal.controllers';

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
    controller.onAnimalSelection('cow');

    expect(stateSpy.$state.go).to.have.been.called.once;
    expect(stateSpy.$state.go).to.have.been.calledWith('form', {animal: 'cow'});
  });
})
