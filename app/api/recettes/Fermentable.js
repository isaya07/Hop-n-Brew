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
    if (options) {
      Object.assign(this, options)
    }
  }

  static getTypeList () {
    return typeList
  }

  getSugar (efficiency) {
    let weight
    this.displayAmount ? weight = Utils.convertWeight(this.displayAmount) : weight = this.amount

    return weight * (this.yield / 100) * (efficiency / 100)
  }

  getColor (batchSize) {
    let weight
    let color
    this.displayAmount ? weight = Utils.convertWeight(this.displayAmount) : weight = this.amount
    this.displayColor ? color = Utils.convertColor(this.displayColor) : color = this.color

    return 2.9396 * (4.23 * color * weight / batchSize) ** 0.6859
  }

  /* toJSON () {
    return {}
    name : this.name,
    type: this.type,
    this.amount = null
    this.yield = null
    this.color = null
    this.addAfterBoil = false
    this.origin = ''
    this.supplier = ''
    this.notes = ''
    this.coarseFineDiff = null
    this.moisture = null
    this.diastaticPower = null
    this.protein = null
    this.maxInBatch = null
    this.recommendMash = false
    this.ibuGalPerLb = null
    }
  } */

  static fromBeerXml (xml) {
    return importXML(xml, 'fermentable')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'fermentable', inRecipe)
  }
}
