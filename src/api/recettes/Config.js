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
    this.gravUnit = 'sg'
    this.colUnit = 'ebc'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'l/kg'
    this.bitterUnitie = 'IBU'
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
    this.gravUnit = 'sg'
    this.colUnit = 'ebc'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'l/kg'
    this.bitterUnitie = 'IBU'
  }

  setImperial () {
    this.weightUnitie = 'lb'
    this.volUnitie = 'gal'
    this.hopUnitie = 'oz'
    this.starterUnitie = 'l'
    this.yeastUnitie = 'ml'
    this.tempUnitie = 'F'
    this.pressUnit = 'psi'
    this.gravUnit = 'sg'
    this.colUnit = 'srm'
    this.timeUnitie = 'min'
    this.ratioUnitie = 'qt/lb'
    this.bitterUnitie = 'IBU'
  }
}
