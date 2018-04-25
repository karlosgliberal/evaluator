import { assign } from 'lodash';

const contactStorageKey = 'contact_data';
const userStorageKey = 'user';

export default class ContactController {
  constructor($timeout, $translate, localStorageManager) {
    assign(this, {$timeout, $translate, localStorageManager});

    this.fields = this.getDataFromLocalStorage() || this.getEmptyFields();
    this.showSavedFormLabel = false;
    this.showErrorFormLabel = false;
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
    this.handleNotifications();

    if (this.form.$valid) {
      this.fields.text = this.$translate.instant('contact.served');
      this.saveDataInLocalStorage();
    }
  }

  handleNotifications() {
    this.showSavedFormLabel = this.form.$valid;
    this.showErrorFormLabel = !this.form.$valid;
    this.$timeout(() => {
      this.showSavedFormLabel = false;
      this.showErrorFormLabel = false;
    }, 3000);
  }

  clear() {
    this.fields = this.getEmptyFields();
    this.form.$setPristine();
    this.form.$setUntouched();

    if (this.getDataFromLocalStorage(contactStorageKey)) {
      this.removeDataFromLocalStorage();
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

  userIsOlmixUser() {
    const user = JSON.parse(this.localStorageManager.getDataFor(userStorageKey));

    return user.isOlmixUser;
  }
}
