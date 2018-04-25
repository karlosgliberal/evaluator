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
    if (this.networkManagerService.isOffline()) {
      this.saveData(report);
      return Promise.reject(new Error('internet'));
    }

    const user = JSON.parse(this.localStorageManager.getDataFor('user'));
    report = this.addUserEmailToReport(report, user);
    report = this.addOlmixContactDataToReportIfAvailable(report, user);

    return this.webManagerService
      .sendDataDrupal(JSON.stringify(report))
      .catch(error => {
        this.saveData(report);
      });
  }

  addUserEmailToReport(report, user) {
    report.email = report.email + ',' + user.email;

    return report;
  }

  addOlmixContactDataToReportIfAvailable(report, user) {
    const contactData = JSON.parse(this.localStorageManager.getDataFor('contact_data'));
    if (contactData) {
      report.contactData = contactData;
    }

    return report;
  }

  saveData(result) {
    this.localStorageManager.save('cola', 1);
    this.localStorageManager.save('Evaluation-' + Date.now(), result);
  }
}
