import form from './form.html';

/*@ngInject*/
const formConfig = ($stateProvider, formlyConfigProvider) => {
  $stateProvider.state('form', {
    url: '/forms',
    template: form,
    controller: 'formController',
    controllerAs: 'form'
  });
};

export default formConfig;
