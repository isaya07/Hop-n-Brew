export default class Water {
  constructor (options) {
    this.name = ''
    this.amount = null
    this.calcium = null
    this.bicarbonate = null
    this.sulfate = null
    this.chloride = null
    this.sodium = null
    this.magnesium = null
    this.ph = null
    this.displayAmount = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  toJSON () {
    return {
      name: this.name,
      amount: this.amount,
      calcium: this.calcium,
      bicarbonate: this.bicarbonate,
      sulfate: this.sulfate,
      chloride: this.chloride,
      sodium: this.sodium,
      magnesium: this.magnesium,
      ph: this.ph
    }
  }
}
