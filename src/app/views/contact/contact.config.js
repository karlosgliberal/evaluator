import contactTemplate from './contact.html';

/*@ngInject*/
const ContactConfig = $stateProvider => {
  $stateProvider.state('contact', {
    url: '/contact',
    template: contactTemplate,
    controller: 'ContactController as contact',
  });
};

export default ContactConfig;
