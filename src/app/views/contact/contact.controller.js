import { assign } from 'lodash';

const contactStorageKey = 'contact_data';

export default class ContactController {
  constructor($timeout, localStorageManager) {
    assign(this, {$timeout, localStorageManager});

    this.fields = this.getDataFromLocalStorage() || this.getEmptyFields();
    this.showSavedFormLabel = false;
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
    this.showSavedFormLabel = this.form.$valid;
    if (this.form.$valid) {
      this.saveDataInLocalStorage();

      this.$timeout(() => {
        this.showSavedFormLabel = false;
      }, 3000);
    }
  }

  clear() {
    if (this.getDataFromLocalStorage(contactStorageKey)) {
      this.removeDataFromLocalStorage();
      this.fields = this.getEmptyFields();
      this.form.$setPristine();
      this.form.$setUntouched();
    }
  }

  getDataFromLocalStorage() {
    return JSON.parse(this.localStorageManager.getDataFor(contactStorageKey));
  }

  saveDataInLocalStorage() {
    this.localStorageManager.save(contactStorageKey, this.fields);
  }

  removeDataFromLocalStorage() {
    this.localStorageManager.remove(contactStorageKey);
  }
}
