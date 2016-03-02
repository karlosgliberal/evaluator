import userFormControllers from './userForm.controllers';

describe('user from controller', () => {

    var sandbox, $scope, spy, controller, userFormServiceSpy;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(angular.mock.module(userFormControllers.name));

    beforeEach(inject(($controller, $rootScope) => {
        $scope = $rootScope.$new();

        userFormServiceSpy = { getFormFields : sandbox.spy()};

        controller = $controller('UserFormController', {
            $scope,
            userFormService: userFormServiceSpy
        })
    }));

    it('should get form fields', () =>{
        expect(userFormServiceSpy.getFormFields).to.have.been.called.once;
    });
});