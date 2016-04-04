export default class cowFields {
  static cowHerdFieldsList() {
    return {
      'feed-intake': 4.706, 'low-milk-production': 4.706, 'body-condition': 2.353, 'coat-condition': 2.353,
      'chewing-activity': 7.059, 'somatic-cells': 7.059, 'leg-troubles': 4.706, 'metabolic-troubles': 7.059,
      turnovers: 2.353, feces: 9.412, 'milk-urea': 2.353, 'weak-calves': 2.353, 'fertility-troubles': 4.706,
      'reproduction-performance': 7.059, 'troubles-from-raw-materials': 11.765
    };
  }

  static cowOnFieldFieldsList() {
    return {
      'corn-procedence': 5.714, 'corn-fields': 11.429, fusarium: 8.571, 'silage-harvest': 8.571, 'grass-silage-cropped': 5.714
    };
  }

  static cowStorageFieldsList() {
    return {
      molds: 5.455, 'silage-troubles': 3.636, 'warm-silage': 5.455,
      'grass-silage': 3.636, 'silage-front-consuption': 1.818
    };
  }

  static getAllFields() {
    return _.merge(this.cowHerdFieldsList(), this.cowOnFieldFieldsList(), this.cowStorageFieldsList());
  };
}
