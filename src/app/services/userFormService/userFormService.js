import { assign } from 'lodash';

export default class UserFormService {
  /*@ngInject*/
  constructor($q) {
    assign(this, {$q});
  };
  getFormFields() {
    this.fields = [{
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
    }
    ];
    return this.fields;
  };
}
