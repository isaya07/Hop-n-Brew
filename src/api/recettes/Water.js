import Utils from './Utils'
import {importXML, exportXML} from './Import'

export default class Water {
  constructor (options) {
    this.name = ''
    this._amount = null
    this.calcium = null
    this.bicarbonate = null
    this.sulfate = null
    this.chloride = null
    this.sodium = null
    this.magnesium = null
    this.ph = null
    this.displayAmount = ''
    this.notes = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  get amount () {
    if (this.displayAmount) {
      return Utils.convertVol(this.displayAmount).value
    } else {
      return this._amount
    }
  }

  set amount (val) {
    this._amount = val
    this.displayAmount = val + ' ' + this._config.weightUnitie
  }

  toJSON () {
    return {
      name: this.name,
      amount: this._amount,
      calcium: this.calcium,
      bicarbonate: this.bicarbonate,
      sulfate: this.sulfate,
      chloride: this.chloride,
      sodium: this.sodium,
      magnesium: this.magnesium,
      ph: this.ph,
      displayAmount: this.displayAmount,
      notes: this.notes
    }
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'water')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'water', inRecipe)
  }
}
