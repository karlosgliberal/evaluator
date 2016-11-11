import {assign} from 'lodash';
import languages from '../../utils/language';

const labelReferenceBase = 'language.';

export default class languageFormService {
  /*@ngInject*/
  constructor($translate, formPartsBuilderService) {
    assign(this, {$translate, formPartsBuilderService});
  };

  generateFormRadio(state, userLanguage) {
    return this.formPartsBuilderService.buildRadioFor('language.', 'selector', languages, state, userLanguage);
  };

  getTextImagen(state){
    var textoImagenAnimal = {};
    if (state.animal === 'dairy'){
      textoImagenAnimal.image = './assets/images/vaca-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + state.animal);
    } else if (state.animal === 'poultry'){
      textoImagenAnimal.image = './assets/images/poultry-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + state.animal);
    } else {
      textoImagenAnimal.image = './assets/images/swine-interior.png';
      textoImagenAnimal.texto = this.$translate.instant('animal.' + state.animal);
    }
    return textoImagenAnimal;
  };
}
