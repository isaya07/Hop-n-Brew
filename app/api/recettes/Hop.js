import Utils from './Utils'
import {importXML, exportXML} from './Import'

const tanh = number => (Math.exp(number) - Math.exp(-number)) / (Math.exp(number) + Math.exp(-number))
const useList = ['Boil', 'Dry Hop', 'Mash', 'First Worst', 'Aroma']
const typeList = ['Bittering', 'Aroma', 'Both']
const formList = ['Pellet', 'Plug', 'Leaf']

export default class Hop {
  constructor (options) {
    this.name = null
    this.alpha = null
    this.amount = null
    this.use = ''
    // this.useList = useList
    this.time = null
    this.notes = null
    this.type = ''
    // this.typeList = typeList
    this.form = ''
    // this.formList = formList
    this.beta = null
    this.hsi = null
    this.origin = null
    this.substitutes = null
    this.humulene = null
    this.caryophyllene = null
    this.cohumulone = null
    this.myrcene = null
    this.displayAmount = null
    this.inventory = null
    this.displayTime = null
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

  static getFormList () {
    return formList
  }

  utilizationFactor () {
    if (this.form === 'pellet') {
      return 1.1
    } else if (this.form === 'plug') {
      return 1.02
    } else {
      return 1.0
    }
  }

  bitterness (ibuMethod, og, batchSize) {
    let adjustment
    let bitterness
    let utilization
    let weight
    let time

    this.displayAmount ? weight = Utils.convertWeight(this.displayAmount) : weight = this.amount
    this.displayTime ? time = Utils.convertTime(this.displayTime) : time = this.time
    // console.log(this)
    // console.log(weight)
    // console.log(time)
    if (ibuMethod === 'tinseth') {
      bitterness = 1.65 * (0.000125 ** (og - 1.0)) * ((1 - Math.E ** (-0.04 * time)) / 4.15) * ((this.alpha / 100.0 * weight * 1000000) / batchSize) * this.utilizationFactor()
    } else if (ibuMethod === 'rager') {
      utilization = 18.11 + 13.86 * tanh((time - 31.32) / 18.27)
      adjustment = Math.max(0, (og - 1.050) / 0.2)
      bitterness = weight * 100 * utilization * this.utilizationFactor() * this.aa / (batchSize * (1 + adjustment))
    } else {
      throw new Error("Unknown IBU method '" + ibuMethod + "'!")
    }
    // console.log(bitterness)
    return bitterness
  }

  /* toJSON () {
  } */

  static fromBeerXml (xml) {
    return importXML(xml, 'hop')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'yeast', inRecipe)
  }
}
