import Utils from './Utils'
import {importXML, exportXML} from './Import'

const tanh = number => (Math.exp(number) - Math.exp(-number)) / (Math.exp(number) + Math.exp(-number))
const useList = ['Boil', 'Dry Hop', 'Mash', 'First Wort', 'Aroma']
const typeList = ['Bittering', 'Aroma', 'Both']
const formList = ['Pellet', 'Plug', 'Leaf']

export default class Hop {
  constructor (options) {
    this.name = null
    this.alpha = null
    this.amount = null
    this.use = ''
    this.time = null
    this.notes = null
    this.type = ''
    this.form = ''
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
    this.parent = null
    if (options) {
      Object.assign(this, options)
    }
  }

  getAmount (unit = 'kg') {
    if (this.displayAmount) {
      return Utils.convertTo(this.displayAmount, unit, 3)
    } else {
      return Utils.convertTo(this.amount + ' kg', unit, 3)
    }
  }

  setAmount (val, unit = 'kg') {
    if (val && val !== this.amount) {
      this.amount = Utils.convertTo(val + ' ' + unit, 'kg', 3)
      this.displayAmount = val + ' ' + unit
      if (this.parent) this.parent.updateIbu()
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

  getBoilUtil (time, og) {
    return (1.65 * Math.pow(0.000125, (og - 1.0))) * ((1 - Math.exp(-0.04 * time)) / 4.15)
  }

  getPostBoilUtil (time, og, coolTime) {
    let util = 0
    if (coolTime) {
      let intTime = 0.001
      for (let i = time; i < time + coolTime; i += intTime) {
        let dU = -1.65 * Math.pow(0.000125, (og - 1.0)) * -0.04 * Math.exp(-0.04 * i) / 4.15
        let tempF = (-1.344 * (i - time)) + 210.64
        let tempK = (tempF + 459.67) * (5.0 / 9.0)
        let degreeOfUtilization = 2.39 * Math.pow(10.0, 11.0) * Math.exp(-9773.0 / tempK)
        if (i < 5.0) degreeOfUtilization = 1.0 // account for nonIAA components
        let combinedValue = dU * degreeOfUtilization
        util += combinedValue * intTime
      }
    }
    return util
  }

  getBitterness (ibuMethod, og, batchSize, coolTime = null) {
    let adjustment
    let bitterness
    let utilization
    let weight
    let time

    this.displayAmount ? weight = Utils.convertTo(this.displayAmount, 'g', 1) : weight = Utils.convertTo(this.amount + ' kg', 'g', 1)
    this.displayTime ? time = Utils.convertTo(this.displayTime, 'min') : time = this.time
    if (this.use === 'First Wort') time = time * 1.1
    else if (this.use === 'Aroma' && this.use === 'Dry Hop') time = 0
    if (ibuMethod === 'tinseth') {
      bitterness = (this.getBoilUtil(time, og) + this.getPostBoilUtil(time, og, coolTime)) * (((this.alpha / 100 * this.utilizationFactor()) * weight * 1000) / batchSize)
    } else if (ibuMethod === 'rager') {
      utilization = 18.11 + 13.86 * tanh((time - 31.32) / 18.27)
      adjustment = Math.max(0, (og - 1.050) / 0.2)
      bitterness = weight * 100 * utilization * this.utilizationFactor() * this.alpha / (batchSize * (1 + adjustment))
    } else {
      throw new Error("Unknown IBU method '" + ibuMethod + "'!")
    }
    return bitterness
  }

  toJSON () {
    return {
      name: this.name,
      alpha: this.alpha,
      amount: this.amount,
      use: this.use,
      time: this.time,
      notes: this.notes,
      type: this.type,
      form: this.form,
      beta: this.beta,
      hsi: this.hsi,
      origin: this.origin,
      substitutes: this.substitutes,
      humulene: this.humulene,
      caryophyllene: this.caryophyllene,
      cohumulone: this.cohumulone,
      myrcene: this.myrcene,
      displayAmount: this.displayAmount,
      inventory: this.inventory,
      displayTime: this.displayTime
    }
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'hop')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'hop', inRecipe)
  }
}
