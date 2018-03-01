import contactControllers from './contact.controllers';
import localStorageManagerService from './../../services/localStorageManagerService/localStorageManager.services';
import constantsService from './../../services/constants/constants.service';

describe('Contact controller', () => {
  let localStorageManagerServiceSpy, timeout, controller;

  beforeEach(angular.mock.module(constantsService.name));

  beforeEach(angular.mock.module(localStorageManagerService.name));

  beforeEach(angular.mock.module(contactControllers.name));

  beforeEach(inject(($controller, $timeout) => {
    localStorageManagerServiceSpy = {getDataFor: sinon.stub(), save: sinon.spy(), remove: sinon.spy()};
    localStorageManagerServiceSpy.getDataFor.returns(null);
    timeout = $timeout;

    controller = $controller('ContactController', {
      localStorageManager: localStorageManagerServiceSpy,
      $timeout: timeout
    });
  }));

  it('should get nothing from local storage when there is no data', () => {
    const localData = controller.getDataFromLocalStorage();

    expect(localData).to.be.null;
    expect(localStorageManagerServiceSpy.getDataFor).to.be.calledTwice;
  });

  it('should get data from local storage', () => {
    localStorageManagerServiceSpy.getDataFor.returns('{}');

    const localData = controller.getDataFromLocalStorage();

    expect(localData).to.eql({});
    expect(localStorageManagerServiceSpy.getDataFor).to.be.calledTwice;
  });

  it('should save data in local storage', () => {
    const fields = {
      name: '::name::',
      post: '::post::',
      company: '::company::',
      email: '::email::',
      phone: '::phone::'
    };
    controller.fields = fields;

    controller.saveDataInLocalStorage();

    expect(localStorageManagerServiceSpy.save.withArgs('contact_data', fields)).to.be.calledOnce;
  });

  it('should clear and save contact fields', () => {
    const expectedFields = {
      name: '',
      post: '',
      company: '',
      email: '',
      phone: ''
    };
    controller.fields = {
      name: '::name::'
    };
    controller.form = {$setPristine: sinon.stub(), $setUntouched: sinon.stub()};
    localStorageManagerServiceSpy.getDataFor.returns('{}');

    controller.clear();

    expect(localStorageManagerServiceSpy.remove.withArgs('contact_data')).to.be.calledOnce;
    expect(controller.fields).to.eql(expectedFields);
    expect(controller.clearedForm).to.be.true;
    timeout.flush();
    expect(controller.clearedForm).to.be.false;
  });

  it('should save data in local storage on valid form submit', () => {
    controller.form = {$valid: true};
    controller.fields = {};

    controller.onSubmit();

    expect(controller.validForm).to.be.true;
    expect(localStorageManagerServiceSpy.save.withArgs('contact_data', {})).to.be.calledOnce;
    timeout.flush();
    expect(controller.validForm).to.be.false;
  });

  it('should not save data in local storage on invalid form submit', () => {
    controller.form = {$valid: false};

    controller.onSubmit();

    expect(controller.validForm).to.be.false;
    expect(localStorageManagerServiceSpy.save).to.not.be.called;
  });
});
