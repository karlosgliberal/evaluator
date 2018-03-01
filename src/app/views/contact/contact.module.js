import contactRun from './contact.run';
import contactConfig from './contact.config';
import contactControllers from './contact.controllers';

const contactModule = angular
    .module('olmixEvaluator.contact', [
      contactControllers.name,
    ])
    .run(contactRun)
    .config(contactConfig);

export default contactModule;
