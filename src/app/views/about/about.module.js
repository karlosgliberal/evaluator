import aboutRun from './about.run';
import aboutConfig from './about.config';
import aboutControllers from './about.controllers';

const aboutModule = angular
    .module('olmixEvaluator.about', [
        aboutControllers.name
    ])
    .run(aboutRun)
    .config(aboutConfig)

export default aboutModule;
