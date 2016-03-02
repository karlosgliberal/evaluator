import appServices from '../../app.services';
import userTestDataBuilder from './userTestDataBuilder';

describe('User Service', () => {
    let sandbox, apiUrl, userService, $httpBackend;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(angular.mock.module(appServices.name));

    beforeEach(inject((_apiUrl_, _userService_, _$httpBackend_) => {
        apiUrl = _apiUrl_;
        userService = _userService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Get Users', () => {
        it('should fetch the users', () => {
            $httpBackend.when('GET', `${apiUrl}/users`).respond(200, userTestDataBuilder);
            expect(userService.saveUsers).to.be.ok;
            //expect(userService.saveUsers(userTestDataBuilder.buildSingle)).to.be.ok;
            //expect(userService.saveUsers).to.be.ok;
            //console.log(localStorageSpy);
            //expect(localStorageSpy.setItem).to.have.been.called.once;
        });

        //it('should save users if retrieved', () => {
        //    $httpBackend.expect('GET', `${apiUrl}/users`).respond(userTestDataBuilder.buildSingle());
        //    expect(userServices.saveUsers()).to.be.ok;
        //    $httpBackend.flush();
        //});
    });
});

