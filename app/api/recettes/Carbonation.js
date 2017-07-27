export default class Carbonation {
  constructor (options) {
    this.name = ''
    this.carbonation = null
    this.forcedCarbonation = false
    this.primingSugarName = ''
    this.carbonationTemp = null
    this.primingSugarEquiv = null
    this.kegPrimingFactor = null
    if (options) {
      Object.assign(this, options)
    }
  }

  /* toJSON () {
  } */
}
