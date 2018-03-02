const errorLabel = {
  bindings: {
    condition: '<',
    errorTranslateKey: '@'
  },
  template: `
    <span class="red-text" ng-if="$ctrl.condition">
      {{$ctrl.errorTranslateKey | translate}}
    </span>
  `
};

export default errorLabel;
