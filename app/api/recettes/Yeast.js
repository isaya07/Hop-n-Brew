import {importXML, exportXML} from './Import'

const typeList = ['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne']
const formList = ['Liquid', 'Dry', 'Slant', 'Culture']
const flocculationList = ['Low', 'Medium', 'High', 'Very High']

export default class Yeast {
  constructor (config, options) {
    this.name = null
    this.type = ''
    this.form = ''
    this.amount = null
    this.amountIsWeight = false
    this.laboratory = null
    this.productId = null
    this.minTemperature = null
    this.maxTemperature = null
    this.flocculation = ''
    this.attenuation = null
    this.notes = null
    this.bestFor = ''
    this.timeCultured = null
    this.maxReuse = null
    this.addToSecondary = false
    this.displayAmount = null
    this.dispMinTemp = null
    this.dispMaxTemp = null
    this.inventory = null
    this.cultureDate = null
    this._config = config
    if (options) {
      Object.assign(this, options)
    }
  }

  static getFlocculationList () {
    return flocculationList
  }

  static getTypeList () {
    return typeList
  }

  static getFormList () {
    return formList
  }

  getAttenuation () {
    return this.attenuation // * 0.9 // TODO viabilité...
  }
  /* toJSON () {
  } */
  static fromBeerXml (xml) {
    return importXML(xml, 'yeast')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'yeast', inRecipe)
  }
}
