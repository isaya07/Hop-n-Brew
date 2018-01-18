import Utils from './Utils'
import {importXML, exportXML} from './Import'

const usedList = ['bottle', 'keg', 'keg with sugar']

export default class Carbonation {
  constructor (options) {
    this.name = ''
    this.carbonation = null
    this.forcedCarbonation = false
    this.primingSugarName = ''
    this.carbonationTemp = null
    this.primingSugarEquiv = null
    this.kegPrimingFactor = 0.5
    this.carbonationUsed = ''
    this.displayCarbTemp = ''
    this.notes = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  static getUsedList () {
    return usedList
  }

  getCarbonationTemp (unit) {
    if (this.displayCarbTemp) {
      return Utils.convertTempTo(this.displayCarbTemp, unit)
    } else {
      return this.carbonationTemp
    }
  }

  setCarbonationTemp (val, unit) {
    this.carbonationTemp = val
    this.displayCarbTemp = val + ' ' + unit
  }

  toJSON () {
    return {
      name: this.name,
      carbonation: this.carbonation,
      forcedCarbonation: this.forcedCarbonation,
      primingSugarName: this.primingSugarName,
      carbonationTemp: this.carbonationTemp,
      primingSugarEquiv: this.primingSugarEquiv,
      kegPrimingFactor: this.kegPrimingFactor,
      carbonationUsed: this.carbonationUsed,
      displayCarbTemp: this.displayCarbTemp,
      notes: this.notes
    }
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'carbonation')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'carbonation', inRecipe)
  }
}
