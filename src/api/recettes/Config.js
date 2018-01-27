const unitiesList = {
  weight: ['kg', 'g', 'oz', 'lb'],
  vol: ['oz', 'cup', 'pt', 'qt', 'gal', 'ml', 'l', 'tsp', 'tblsp'],
  temp: ['F', 'C'],
  time: ['min', 'hour', 'day', 'week'],
  color: ['srm', 'ebc', 'L'],
  grav: ['sg', 'plato'],
  press: ['bar', 'psi', 'kpa'],
  ratio: ['qt/lb', 'l/kg'],
  yeast: ['ml', 'g', 'pkg']
}

export default class Config {
  constructor (options) {
    this.weightUnitie = 'kg'
    this.volUnitie = 'l'
    this.hopUnitie = 'g'
    this.starterUnitie = 'l'
    this.yeastUnitie = 'ml'
    this.tempUnitie = 'C'
    this.pressUnit = 'bar'
    this.gravUnit = 'SG'
    this.colUnit = 'EBC'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'l/kg'
    // this.refactUnit = 'Brix'
    if (options) {
      Object.assign(this, options)
    }
  }

  getUnitiesList () {
    return unitiesList
  }

  setMetric () {
    this.weightUnitie = 'kg'
    this.volUnitie = 'l'
    this.hopUnitie = 'g'
    this.starterUnitie = 'l'
    this.yeastUnitie = 'ml'
    this.tempUnitie = 'C'
    this.pressUnit = 'bar'
    this.gravUnit = 'SG'
    this.colUnit = 'EBC'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'l/kg'
  }

  setImperial () {
    this.weightUnitie = 'lb'
    this.volUnitie = 'gal'
    this.hopUnitie = 'oz'
    this.starterUnitie = 'l'
    this.yeastUnitie = 'ml'
    this.tempUnitie = 'F'
    this.pressUnit = 'psi'
    this.gravUnit = 'SG'
    this.colUnit = 'SRM'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'qt/lb'
  }
}
