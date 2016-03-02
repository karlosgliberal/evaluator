import { assign } from 'lodash';

export default class UserFormController {
    /*@ngInject*/
    constructor(userFormService) {
        assign(this, {
            userFormService
        });

        this.formFields = userFormService.getFormFields();
    }
}
