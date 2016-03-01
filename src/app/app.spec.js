// all of our Jasmine and Sinon utilities (describe, it, sinon) are globally
// injected by Karma. no need to import them manually for each test.
import App from './app';

describe('Application Tests', () => {
  let sandbox, stubs, controller, deferred, scope;
  let usersData = [{
    id: 1,
    name: 'Dave Ackerman',
    email: 'dave@nugget.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg'
  }, {
    id: 2,
    name: 'Joe Schmoe',
    email: 'joe@nugget.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/teleject/128.jpg'
  }];

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(angular.mock.module(App.name));

  beforeEach(inject(($controller, $q, $rootScope) => {
   // Since we don't want ui router changing the browser url on state transistions,
   // we'll mock the state server and test that it was called as expected.
    scope = $rootScope.$new();

    stubs = {
      userService: {
        getUsers: sandbox.stub().returns($q.when({
          data: {
            users: usersData
          }
        }))
      },
      $state: {
        go: sandbox.stub()
      }
    };

    controller = $controller('AppController', {
      $state: stubs.$state,
      userService: stubs.userService
    });

  }));

  afterEach(() => {
    sandbox.reset();
  });

  describe('App Controller', () => {

    it('should be defined', () => {
      expect(controller).to.be.ok;
    });

    it('should define an onSeleccionAnimalTap method', () => {
      expect(controller.onSeleccionAnimalTap).to.be.ok;
    });

    //test
    it('should transition to the seleccion Animal component', () => {
      controller.onSeleccionAnimalTap();
      expect(stubs.$state.go).to.have.been.called.once;
      expect(stubs.$state.go).to.have.been.calledWith('seleccionAnimal');
    });

  });

});
