import {camelize} from './Import'
import * as utils from './Utils'
import Utils from 'api/recettes/Utils'

const typeList = ['Infusion', 'Temperature', 'Decoction']
let inCalc = false

export default class MashStep {
  constructor (config, options) {
    this.name = ''
    this._type = ''
    // this.typeList = ['Infusion', 'Temperature', 'Decoction']
    this._infuseAmount = 0
    this._stepTemp = 0
    this._stepTime = 0
    this._rampTime = 0
    this.endTime = null
    this.description = ''
    this._waterGrainRatio = 2.5
    this.decoctionAmt = ''
    this.infuseTemp = ''
    this.displayStepTemp = ''
    this.displayInfuseAmt = ''
    this._config = config
    if (options) {
      Object.assign(this, options)
    }
    // console.log('construc', this)
  }

  set type (type) {
    this._type = type
    this.calcData()
  }
  get type () { return this._type }

  set stepTime (time) {
    this._stepTime = time
    this.endTime = this._stepTime + this._rampTime
    // this.calcData()
  }
  get stepTime () { return this._stepTime }

  set waterGrainRatio (ratio) {
    let rat = Utils.extarctDisplayValue(ratio)
    if (rat.unitie === 'qt/lb' && this._config.ratioUnitie === 'l/kg') {
      this._waterGrainRatio = Utils.quartsPerLbToLitersPerKg(rat.weight)
    } else if ((rat.unitie === 'l/kg' && this._config.ratioUnitie === 'qt/lb')) {
      this._waterGrainRatio = Utils.litersPerKgToQuartsPerLb(rat.weight)
    } else { // rat.unitie === this._config.ratioUnitie
      this._waterGrainRatio = rat.weight
    }
    this.calcData('ratio')
  }
  get waterGrainRatio () { return this._waterGrainRatio/* + ' ' + this._config.ratioUnitie */ }

  set infuseAmount (amount) {
    this._infuseAmount = amount
    this.calcData('amount')
  }
  get infuseAmount () { return this._infuseAmount }

  set rampTime (time) {
    this._rampTime = time
    this.endTime = this._stepTime + this._rampTime
    // this.calcData()
  }
  get rampTime () { return this._rampTime }

  set stepTemp (val) {
    // console.log('set steptemp', val)
    if (val) {
      this._stepTemp = val
      this.displayStepTemp = val + ' ' + this._config.tempUnitie
      this.calcData()
    }
  }
  get stepTemp () {
    if (this.displayStepTemp) {
      return Utils.convertTemp(this.displayStepTemp).temp
    } else {
      return this._stepTemp
    }
  }

  calcData = (param) => {
    if (!inCalc) {
      inCalc = true
      if (this.type === 'Infusion') {
        if (this.mash && this.mash.recipe) {
          let recipe = this.mash.recipe
          let totalGrain = recipe.getFementablesTotal()
          if (param !== 'ratio' && this._infuseAmount !== 0) {
            this._waterGrainRatio = utils.roundDecimal(this._infuseAmount / totalGrain, 3)
          } else {
            this._infuseAmount = utils.roundDecimal(totalGrain * this._waterGrainRatio, 1)
            this.mash.updateStepWaterRatio(this.name, this._waterGrainRatio)
          }
          let infamout = this._infuseAmount
          let value = this._stepTemp
          let inf = Utils.roundDecimal(((value * infamout - 0.41 * (totalGrain * this.mash.grainTemp - value * totalGrain)) / infamout), 1)
          this.infuseTemp = inf
          this.description = 'Add ' + infamout + ' l of water at ' + inf + ' °C'
        }
      } else if (this.type === 'Temperature') {
        this.description = 'Up to ' + this.stepTemp + ' in ' + this.rampTime + ' min'
      }
      // console.log(this)
      if (this.mash) this.mash.calcSpargeVol()
      inCalc = false
    }
  }

  static getTypeList = () => {
    return typeList
  }

  toJSON = () => {
    return {
      name: this.name,
      type: this._type,
      infuseAmount: this._infuseAmount,
      stepTemp: this._stepTemp,
      stepTime: this._stepTime,
      rampTime: this._rampTime,
      endTime: this.endTime,
      description: this.description,
      waterGrainRatio: this._waterGrainRatio + ' ' + this._config.ratioUnitie,
      decoctionAmt: this.decoctionAmt,
      infuseTemp: this.infuseTemp,
      displayStepTemp: this.displayStepTemp,
      displayInfuseAmt: this.displayInfuseAmt
    }
  }

  static fromNodes = (nodes, parent, config) => {
    let steps = []

    let ref = nodes.childNodes || []
    ref.forEach(function (step) {
      if (step.nodeName.toLowerCase() === 'mash_step') {
        let options = {mash: parent}
        let props = step.childNodes || []
        props.forEach(function (item) {
          if (item.nodeName !== '#text') {
            let itemName = camelize(item.nodeName)
            if (!isNaN(item.textContent)) {
              options[itemName] = +item.textContent
            } else {
              options[itemName] = item.textContent
            }
          }
        })
        steps.push(new MashStep(config, options))
      }
    })

    return steps
  }
}
