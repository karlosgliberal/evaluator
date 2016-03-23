export default class poultryFields {
  /** Laying hens**/
  static poultryLayingHensAnimalFieldsList() {
    return ['feed-intake',
      'body-weight',
      'liquid-droppings',
      'water-consumption',
      'vaccination',
      'infectious-diseases',
      'dermatitis',
      'gizzard',
      'mortality',
      'liver-damage',
      'ovaries-size',
      'tibial',
      'thymus'];
  }

  static poultryLayingHensEggsProductionFieldList() {
    return ['egg-production',
      'egg-weight',
      'shell-quality'];
  }

  static poultryLayingHensFeedFieldList() {
    return ['home-grown',
      'use-of-corn',
      'storage-facilities',
      'feed-management',
      'preservation-problems'];
  }

  /** Breeder **/
  static poultryBreederAnimalFieldsList() {
    return ['feed-intake',
      'body-weight',
      'liquid-droppings',
      'water-consumption',
      'vaccination',
      'infectious-diseases',
      'dermatitis',
      'gizzard',
      'mortality',
      'liver-damage',
      'ovaries-size',
      'tibial',
      'thymus'];
  }

  static poultryBreederEggsProductionFieldsList() {
    return ['egg-production',
      'egg-weight',
      'shell-quality',
      'egg-hatchability',
      'progeny'];
  }

  static poultryBreederFeedFieldsList() {
    return ['home-grown',
      'use-of-corn',
      'storage-facilities',
      'feed-management',
      'preservation-problems'];
  }

  /** Broiler **/
  static poultryBroilerAnimalFieldsList() {
    return ['feed-intake',
      'body-weight',
      'fcr',
      'droppings',
      'water-consumption',
      'infectious-diseases',
      'vaccination',
      'mucosal-necrosis',
      'gizzard',
      'mortality',
      'liver-damage',
      'tibial-dyschondroplasia',
      'thymus',
      'sphinganine'];
  }

  static poultryBroilerFeedFieldsList() {
    return ['home-grown',
      'use-of-corn',
      'preservation-problems',
      'storage-facilities'];
  }
}
