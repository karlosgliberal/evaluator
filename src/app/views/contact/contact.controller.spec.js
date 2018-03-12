import contactControllers from './contact.controllers';
import localStorageManagerService from './../../services/localStorageManagerService/localStorageManager.services';

describe('Contact controller', () => {
  let $translate, localStorageManagerServiceSpy, timeout, controller;

  beforeEach(angular.mock.module(localStorageManagerService.name));

  beforeEach(angular.mock.module(contactControllers.name));

  beforeEach(inject(($controller, $timeout) => {
    localStorageManagerServiceSpy = {getDataFor: sinon.stub(), save: sinon.spy(), remove: sinon.spy()};
    localStorageManagerServiceSpy.getDataFor.returns(null);
    $translate = {instant: sinon.stub()};
    timeout = $timeout;

    controller = $controller('ContactController', {
      localStorageManager: localStorageManagerServiceSpy,
      $timeout: timeout,
      $translate: $translate
    });
  }));

  it('should get nothing from local storage when there is no data', () => {
    const localData = controller.getDataFromLocalStorage();

    expect(localData).to.be.null;
    expect(localStorageManagerServiceSpy.getDataFor).to.be.calledTwice;
  });

  it('should get data from local storage', () => {
    localStorageManagerServiceSpy.getDataFor.returns('{"name": "::name::"}');
    const expectedFields = {
      name: '::name::'
    };

    const localData = controller.getDataFromLocalStorage();

    expect(localData).to.eql(expectedFields);
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
  });

  it('should save data in local storage on valid form submit', () => {
    controller.form = {$valid: true};
    $translate.instant.withArgs('contact.served').returns('::text::');
    const fields = {
      name: '::name::',
      post: '::post::',
      company: '::company::',
      email: '::email::',
      phone: '::phone::'
    };
    const expectedFields = {
      name: '::name::',
      post: '::post::',
      company: '::company::',
      email: '::email::',
      phone: '::phone::',
      text: '::text::'
    };
    controller.fields = fields;

    controller.onSubmit();

    expect(controller.showSavedFormLabel).to.be.true;
    expect($translate.instant).to.be.calledOnce;
    expect(localStorageManagerServiceSpy.save.withArgs('contact_data', expectedFields)).to.be.calledOnce;
    timeout.flush();
    expect(controller.showSavedFormLabel).to.be.false;
  });

  it('should not save data in local storage on invalid form submit', () => {
    controller.form = {$valid: false};

    controller.onSubmit();

    expect(controller.showSavedFormLabel).to.be.false;
    expect(localStorageManagerServiceSpy.save).to.not.be.called;
  });
});
