export default class swineFields {
  static swineOnAnimalFieldsList() {
    return {
      'sows-status': 4,
      'poor-growth': 2,
      intake: 4,
      'skin-color': 2,
      'milk-production': 6,
      'veterinary-intervention': 4,
      'lactation-start': 4,
      'stillborn-piglets': 6,
      'small-piglets-at-birth': 6,
      'splay-legs': 4,
      'red-vulva': 10,
      'neonatal-diarrea': 6,
      necrosis: 8,
      'reproduction-troubles': 2,
      'heat-detection': 6,
      'weaning-insemination': 6
    };
  }

  static swineOnFeedFieldsList() {
    return {
      'home-grown': 5.455,
      'use-of-corn': 7.273,
      'storage-facilities': 5.455,
      'grains-preservation-problems': 1.818
    };
  }

  static getAllFields() {
    return _.merge(this.swineOnAnimalFieldsList(), this.swineOnFeedFieldsList());
  }
}
