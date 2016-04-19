import form from './form.html';

/*@ngInject*/
const formConfig = ($stateProvider, formlyConfigProvider) => {
  $stateProvider.state('form', {
    url: '/forms',
    template: form,
    controller: 'formController',
    controllerAs: 'form',
    cache: false,
    params: {
      animal: ''
    }
  });

  formlyConfigProvider.setWrapper({
    name: 'panel',
    templateUrl: 'panel.html'
  });
};

export default formConfig;
