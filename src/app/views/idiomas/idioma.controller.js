import { assign } from 'lodash';

export default class IdiomaController {
    /*@ngInject*/
    constructor($scope) {
        assign(this, {
            $scope,
            idioma: [
                'Es',
                'En',
                'Eu',
                'Gr',
                'Ru'
            ]
        });
    }

    removeIdioma(technology) {
        this.idioma.splice(this.idoma.indexOf(idioma), 1);
    }
}