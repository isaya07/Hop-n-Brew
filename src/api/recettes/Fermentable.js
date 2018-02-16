import Utils from './Utils'
import {importXML, exportXML} from './Import' // ,htmlEncode, underscorize, camelize

const typeList = ['Grain', 'Sugar', 'Extract', 'Dry Extract', 'Adjunct']

export default class Fermentable {
  constructor (options) {
    this.name = null
    this.type = ''
    this.amount = null
    this.yield = null
    this.color = null
    this.addAfterBoil = null
    this.origin = null
    this.supplier = null
    this.notes = null
    this.coarseFineDiff = null
    this.moisture = null
    this.diastaticPower = null
    this.protein = null
    this.maxInBatch = null
    this.recommendMash = null
    this.ibuGalPerLb = null
    this.displayAmount = null
    this.potential = null
    this.inventory = null
    this.price = null
    this.displayColor = null
    this.parent = null
    if (options) {
      Object.assign(this, options)
    }
  }

  static getTypeList () {
    return typeList
  }

  getAmount (unit = 'kg') {
    if (this.displayAmount) {
      return Utils.convertTo(this.displayAmount, unit)
    } else {
      return this.amount
    }
  }

  setAmount (val, unit = 'kg') {
    if (val && val !== this.amount) {
      this.amount = val
      this.displayAmount = val + ' ' + unit
      if (this.parent) this.parent.updateOg()
    }
  }

  getColor (unit = 'ebc') {
    if (this.displayColor) {
      return Utils.convertTo(this.displayColor, unit)
    } else {
      return this.color
    }
  }

  setColor (val, unit = 'ebc') {
    if (val && val !== this.color) {
      this.color = val
      this.displayColor = val + ' ' + unit
      this.calcData()
    }
  }

  calcSugar (efficiency) {
    let weight
    this.displayAmount ? weight = Utils.convertTo(this.displayAmount, 'kg') : weight = this.amount
    return weight * (this.yield / 100) * (efficiency / 100)
  }

  calcColor (batchSize) {
    let weight
    let color
    this.displayAmount ? weight = Utils.convertTo(this.displayAmount, 'kg') : weight = this.amount
    this.displayColor ? color = Utils.convertTo(this.displayColor, 'ebc') : color = this.color

    return 2.9396 * (4.23 * color * weight / batchSize) ** 0.6859
  }

  toJSON () {
    return {
      name: this.name,
      type: this.type,
      amount: this.amount,
      yield: this.yield,
      color: this.color,
      addAfterBoil: this.addAfterBoil,
      origin: this.origin,
      supplier: this.supplier,
      notes: this.notes,
      coarseFineDiff: this.coarseFineDiff,
      moisture: this.moisture,
      diastaticPower: this.diastaticPower,
      protein: this.protein,
      maxInBatch: this.maxInBatch,
      recommendMash: this.recommendMash,
      ibuGalPerLb: this.ibuGalPerLb,
      displayAmount: this.displayAmount,
      potential: this.potential,
      inventory: this.inventory,
      price: this.price,
      displayColor: this.displayColor
    }
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'fermentable')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'fermentable', inRecipe)
  }
}
