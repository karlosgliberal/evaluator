import idiomaTemplate from './idioma.html';

/*@ngInject*/
const IdiomaConfig = ($stateProvider) => {
  $stateProvider.state('idioma', {
    url: '/idioma',
    template: idiomaTemplate,
    controller: 'IdiomaController',
    controllerAs: 'idioma'
  });
};

export default IdiomaConfig;
