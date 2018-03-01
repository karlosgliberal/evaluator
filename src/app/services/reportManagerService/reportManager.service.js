import {assign} from 'lodash';


export default class reportManagerService {
  /*@ngInject*/
  constructor(networkManagerService, webManagerService, localStorageManager) {
    assign(this, {networkManagerService, webManagerService, localStorageManager});
  };

  sendReport(animal, result, email) {
    let report = result;
    report.email = email;

    this.networkManagerService.startWatching();
    if (!this.networkManagerService.isOnline()) {
      this.saveData(report);
      return Promise.reject(new Error('internet'));
    }

    this.addOlmixContactDataToReportIfAvailable(report);
    return this.webManagerService
      .sendDataDrupal(JSON.stringify(report))
      .catch(error => {
        this.saveData(report);
      });
  }

  addOlmixContactDataToReportIfAvailable(report) {
    const contactData = JSON.parse(this.localStorageManager.getDataFor('contact_data'));
    if (contactData) {
      report.contactData = contactData;
      report.email = report.email + ',' + contactData.email;
    }
  }

  saveData(result) {
    this.localStorageManager.save('cola', 1);
    this.localStorageManager.save('Evaluation-' + Date.now(), result);
  }
}
