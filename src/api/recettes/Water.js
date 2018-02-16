import Utils from './Utils'
import {importXML, exportXML} from './Import'

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
    this.notes = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  getAmount (unit = 'l') {
    if (this.displayAmount) {
      return Utils.convertTo(this.displayAmount, unit, 3)
    } else {
      return Utils.convertTo(this.amount + ' l', unit, 3)
    }
  }

  setAmount (val, unit = 'l') {
    if (val && val !== this.amount) {
      this.amount = Utils.convertTo(val + ' ' + unit, 'l', 3)
      this.displayAmount = val + ' ' + unit
    }
  }

  /* toJSON () {
    return {
      name: this.name,
      amount: this.amount,
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
  } */

  static fromBeerXml (xml) {
    return importXML(xml, 'water')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'water', inRecipe)
  }
}
