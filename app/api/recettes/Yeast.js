export default class Yeast {
  constructor (options) {
    this.name = null
    this.type = ''
    this.typeList = ['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne']
    this.form = ''
    this.formList = ['Liquid', 'Dry', 'Slant', 'Culture']
    this.amount = null
    this.amountIsWeight = false
    this.laboratory = null
    this.productId = null
    this.minTemperature = null
    this.maxTemperature = null
    this.flocculation = ''
    this.flocculationList = ['Low', 'Medium', 'High', 'Very High']
    this.attenuation = null
    this.notes = null
    this.bestFor = ''
    this.timeCultured = null
    this.maxReuse = null
    this.addToSecondary = false
    this.displayAmount = null
    this.dispMinTemp = null
    this.DispMaxTemp = null
    this.inventory = null
    this.cultureDate = null
    if (options) {
      Object.assign(this, options)
    }
  }

  getAttenuation () {
    return this.attenuation // * 0.9 // TODO viabilité...
  }
  /* toJSON () {
  } */
}
