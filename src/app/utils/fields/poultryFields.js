import poultry from './../poultry';

export default class poultryFields {
  /** Laying hens**/
  static poultryLayingHensAnimalFieldsList() {
    return {
      'feed-intake': 3.462,
      'body-weight': 3.462,
      'liquid-droppings': 3.462,
      'water-consumption': 1.731,
      vaccination: 3.462,
      'infectious-diseases': 5.192,
      dermatitis: 5.192,
      gizzard: 5.192,
      mortality: 1.731,
      'liver-damage': 5.192,
      'ovaries-size': 1.731,
      tibial: 1.731,
      thymus: 3.462
    };
  }

  static poultryLayingHensEggsProductionFieldList() {
    return {
      'egg-production': 15,
      'egg-weight': 10,
      'shell-quality': 15
    };
  }

  static poultryLayingHensFeedFieldList() {
    return {
      'home-grown': 3,
      'use-of-corn': 3,
      'storage-facilities': 3,
      'feed-management': 3,
      'preservation-problems': 3
    };
  }

  /** Breeder **/
  static poultryBreederAnimalFieldsList() {
    return {
      'feed-intake': 3.462,
      'body-weight': 3.462,
      'liquid-droppings': 3.462,
      'water-consumption': 1.731,
      vaccination: 3.462,
      'infectious-diseases': 5.192,
      dermatitis: 5.192,
      gizzard: 5.192,
      mortality: 1.731,
      'liver-damage': 5.192,
      'ovaries-size': 1.731,
      tibial: 1.731,
      thymus: 3.462
    };
  }

  static poultryBreederEggsProductionFieldsList() {
    return {
      'egg-production': 9.23,
      'egg-weight': 6.15,
      'shell-quality': 9.23,
      'egg-hatchability': 9.23,
      progeny: 6.15
    };
  }

  static poultryBreederFeedFieldsList() {
    return {
      'home-grown': 3,
      'use-of-corn': 3,
      'storage-facilities': 3,
      'feed-management': 3,
      'preservation-problems': 3
    };
  }

  /** Broiler **/
  static poultryBroilerAnimalFieldsList() {
    return {
      'feed-intake': 4.118,
      'body-weight': 4.118,
      fcr: 8.235,
      droppings: 2.059,
      'water-consumption': 2.059,
      'infectious-diseases': 6,
      vaccination: 6.176,
      'mucosal-necrosis': 8.235,
      gizzard: 6.176,
      mortality: 2.059,
      'liver-damage': 6.176,
      'tibial-dyschondroplasia': 2.059,
      thymus: 4.118,
      sphinganine: 8.235
    };
  }

  static poultryBroilerFeedFieldsList() {
    return {
      'home-grown': 7.5,
      'use-of-corn': 7.5,
      'preservation-problems': 7.5,
      'storage-facilities': 7.5
    };
  }

  static getAllFieldsFor(specie) {
    if (specie === poultry.HENS) {
      return _.merge(this.poultryLayingHensAnimalFieldsList(), this.poultryLayingHensEggsProductionFieldList(), this.poultryLayingHensFeedFieldList());
    } else if (specie === poultry.BREEDER) {
      return _.merge(this.poultryBreederAnimalFieldsList(), this.poultryBreederEggsProductionFieldsList(), this.poultryBreederFeedFieldsList());
    }
    return _.merge(this.poultryBroilerAnimalFieldsList(), this.poultryBroilerFeedFieldsList());
  }
}
