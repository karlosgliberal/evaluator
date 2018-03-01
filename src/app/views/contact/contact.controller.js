import { assign } from 'lodash';

const localStorageKey = 'contact_data';

export default class ContactController {
  constructor($timeout, localStorageManager, logoIcon) {
    assign(this, {
      $timeout,
      localStorageManager,
      logoIcon
    });

    this.fields = this.getDataFromLocalStorage() || this.getEmptyFields();
    this.validForm = false;
    this.clearedForm = false;
  }

  getEmptyFields() {
    return {
      name: '',
      post: '',
      company: '',
      email: '',
      phone: '',
    };
  }

  onSubmit() {
    this.validForm = this.form.$valid;
    if (this.form.$valid) {
      this.saveDataInLocalStorage();

      this.$timeout(() => {
        this.validForm = false;
      }, 3000);
    }
  }

  clear() {
    if (this.getDataFromLocalStorage(localStorageKey)) {
      this.clearedForm = true;
      this.fields = this.getEmptyFields();
      this.form.$setPristine();
      this.form.$setUntouched();
      this.removeDataFromLocalStorage();

      this.$timeout(() => {
        this.clearedForm = false;
      }, 3000);
    }
  }

  getDataFromLocalStorage() {
    return JSON.parse(this.localStorageManager.getDataFor(localStorageKey));
  }

  saveDataInLocalStorage() {
    this.localStorageManager.save(localStorageKey, this.fields);
  }

  removeDataFromLocalStorage() {
    this.localStorageManager.remove(localStorageKey);
  }
}
