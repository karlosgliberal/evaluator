import {assign} from 'lodash';
import languages from '../../utils/language';
import animals from './../../utils/animal';

const labelReferenceBase = 'language.';

export default class languageFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateFormRadio(state, userLanguage) {
    return this.formPartsBuilderService.buildRadioFor(labelReferenceBase, 'selector', languages, state, userLanguage);
  };

  getTextImagen(state){
    var textoImagenAnimal = {};
    if (state.animal === animals.COW){
      textoImagenAnimal.image = './assets/images/vaca-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + animals.COW);
    } else if (state.animal === animals.POULTRY){
      textoImagenAnimal.image = './assets/images/chicken-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + animals.POULTRY);
    } else {
      textoImagenAnimal.image = './assets/images/pig-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + animals.SWINE);
    }

    return textoImagenAnimal;
  };
}
