import {importXML, exportXML} from './Import'

const typeList = ['Spice', 'Fining', 'Water Agent', 'Herb', 'Flavor', 'Other']
const useList = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling']

export default class Misc {
  constructor (config, options) {
    this.name = ''
    this.type = ''
    this.use = ''
    this.time = null
    this.amount = null
    this.amountIsWeight = false
    this.useFor = ''
    this.notes = ''
    this.displayAmount = ''
    this.inventory = ''
    this.displayTime = ''
    this._config = config
    if (options) {
      Object.assign(this, options)
    }
  }

  static getUseList () {
    return useList
  }

  static getTypeList () {
    return typeList
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'misc')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'misc', inRecipe)
  }
  /* toJSON () {
  } */
}
