import Utils from './Utils'
import {importXML, exportXML} from './Import'

const typeList = ['Spice', 'Fining', 'Water Agent', 'Herb', 'Flavor', 'Other']
const useList = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling']

export default class Misc {
  constructor (options) {
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
    if (options) {
      Object.assign(this, options)
    }
  }

  getAmount (unit) {
    if (this.displayAmount) {
      return Utils.convertTo(this.displayAmount, unit, 3)
    } else {
      let defUnit = 'l'
      if (this.amountIsWeight) defUnit = 'kg'
      return Utils.convertTo(this.amount + ' ' + defUnit, unit, 3)
    }
  }

  setAmount (val, unit) {
    if (val && val !== this.amount) {
      let defUnit = 'l'
      if (this.amountIsWeight) defUnit = 'kg'
      this.amount = Utils.convertTo(val + ' ' + unit, defUnit, 3)
      this.displayAmount = val + ' ' + unit
    }
  }

  getTime (unit = 'min') {
    if (this.displayTime) {
      return Utils.convertTo(this.displayTime, unit, 3)
    } else {
      return this.time
    }
  }

  setTime (val, unit = 'min') {
    if (val && val !== this.time) {
      this.time = val
      this.displayTime = val + ' ' + unit
      if (this.parent) this.parent.updateIbu()
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
