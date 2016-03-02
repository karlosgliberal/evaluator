import userFormServices from '../../views/userForm/userForm.services';

describe('User form service', () =>{

    var userFormService;

    beforeEach(angular.mock.module(userFormServices.name));

    beforeEach(inject((_userFormService_)=>{
        userFormService = _userFormService_;
    }));

    describe('user form service', function(){
        it('should fetch form fields', () => {
            expect(userFormService.getFormFields()).to.be.ok;
            expect(userFormService.getFormFields()).to.eql([{
                key: 'username',
                type: 'inline-input',
                templateOptions: {
                    type: 'text',
                    label: 'Username'
                }
            }, {
                key: 'password',
                type: 'inline-input',
                templateOptions: {
                    type: 'password',
                    label: 'Password'
                }
            }]);
        })
    })
});