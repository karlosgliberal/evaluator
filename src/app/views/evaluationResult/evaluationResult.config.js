import evaluationResultTemplate from './evaluationResult.html';

/*@ngInject*/
const IdiomaConfig = ($stateProvider) => {
  $stateProvider.state('evaluationResult', {
    url: '/evaluationResult',
    template: evaluationResultTemplate,
    controller: 'evaluationResultController',
    controllerAs: 'evaluationResult',
    params: {
      animal: '',
      result: ''
    }
  });
};

export default IdiomaConfig;
