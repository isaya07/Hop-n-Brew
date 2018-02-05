import Utils from './Utils'

const typeList = ['Infusion', 'Temperature', 'Decoction']
let inCalc = false

export default class MashStep {
  constructor (config, options) {
    this.name = ''
    this.type = ''
    this.infuseAmount = 0
    this._stepTemp = 0
    this._stepTime = 0
    this._rampTime = 0
    this.endTemp = 0
    this.description = ''
    this.waterGrainRatio = '2.6 l/kg'
    this.decoctionAmt = ''
    this.infuseTemp = ''
    this.displayStepTemp = ''
    this.displayInfuseAmt = ''
    this._config = config
    if (options) {
      Object.assign(this, options)
    }
    if (this._rampTime === 0 && this.type === 'Infusion') this._rampTime = 2
    if (this.endTemp === 0 && this._stepTemp !== 0) this.endTemp = this._stepTemp
    if (this.displayStepTemp === '') this.displayStepTemp = this._stepTemp + ' ' + this._config.tempUnitie
    if (this.displayInfuseAmt === '') this.displayInfuseAmt = this.infuseAmount + ' l'
  }

  set stepTime (time) {
    this._stepTime = time
    // this.calcData()
  }
  get stepTime () { return this._stepTime }

  getWaterGrainRatio (unit = 'l/kg') {
    // let ratio = this.mash.getStepWaterRatio(this.name)
    return Utils.convertTo(this.waterGrainRatio, unit, 3)
  }

  setWaterGrainRatio (val, unit = 'l/kg') {
    let temp = val + ' ' + unit
    if (temp !== this.waterGrainRatio) {
      this.waterGrainRatio = temp
      this.calcData('ratio')
    }
  }

  getInfuseAmount (unit = 'l') {
    if (this.displayInfuseAmt) {
      return Utils.convertTo(this.displayInfuseAmt, unit)
    } else {
      return this.infuseAmount
    }
  }

  setInfuseAmount (val, unit = 'l') {
    if (val && val !== this.infuseAmount) {
      this.infuseAmount = val
      this.displayInfuseAmt = val + ' ' + unit
      this.calcData()
    }
  }

  set rampTime (time) {
    this._rampTime = time
    this.calcData()
  }
  get rampTime () { return this._rampTime }

  set stepTemp (val) {
    if (val) {
      this._stepTemp = val
      this.displayStepTemp = val + ' ' + this._config.tempUnitie
      if (this.type === 'Infusion') {
        let totalGrain = this.mash.recipe.getFementablesTotal()
        this.infuseTemp = Utils.roundDecimal(((this._stepTemp * this.infuseAmount - 0.41 * (totalGrain * this.mash.grainTemp - this._stepTemp * totalGrain)) / this.infuseAmount), 1)
      }
    }
  }

  get stepTemp () {
    if (this.displayStepTemp) {
      return Utils.convertTo(this.displayStepTemp, 'c')
    } else {
      return this._stepTemp
    }
  }

  calcRatio = (totalGrain) => {
    this.setWaterGrainRatio(Utils.roundDecimal(this.infuseAmount / totalGrain, 3))
  }

  calcAmount = (totalGrain) => {
    this.setInfuseAmount(Utils.roundDecimal(totalGrain * this.getWaterGrainRatio(), 3))
  }

  calcInfTemp = (totalGrain) => {
    if (this.mash) {
      this.infuseTemp = Utils.roundDecimal(((this._stepTemp * this.infuseAmount - 0.41 * (totalGrain * this.mash.grainTemp - this._stepTemp * totalGrain)) / this.infuseAmount), 1)
    }
  }

  calcData = (param) => {
    if (!inCalc) {
      inCalc = true
      if (this.type === 'Infusion') {
        if (this.mash && this.mash.recipe) {
          let totalGrain = this.mash.recipe.getFementablesTotal()
          let infamout = this.getInfuseAmount()

          if (param !== 'ratio' && infamout !== 0) {
            this.setWaterGrainRatio(Utils.roundDecimal(infamout / totalGrain, 3))
          } else if (param === 'ratio') {
            infamout = Utils.roundDecimal(totalGrain * this.getWaterGrainRatio(), 3)
            this.setInfuseAmount(infamout)
          }
          this.infuseTemp = Utils.roundDecimal(((this._stepTemp * infamout - 0.41 * (totalGrain * this.mash.grainTemp - this._stepTemp * totalGrain)) / infamout), 1)
          this.description = 'Add ' + infamout + ' l of water at ' + this.infuseTemp + ' °C'
        }
      } else if (this.type === 'Temperature') {
        this.description = 'Up to ' + this.stepTemp + ' in ' + this.rampTime + ' min'
        this.setWaterGrainRatio(this.mash.getStepWaterRatio(this.name))
      }
      // if (this.mash) this.mash.calcSpargeVol()
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
      infuseAmount: this.infuseAmount,
      stepTemp: this._stepTemp,
      stepTime: this._stepTime,
      rampTime: this._rampTime,
      endTemp: this.endTemp,
      description: this.description,
      waterGrainRatio: this.mash.getStepWaterRatio(this.name),
      decoctionAmt: this.decoctionAmt,
      infuseTemp: this.infuseTemp,
      displayStepTemp: this.displayStepTemp,
      displayInfuseAmt: this.displayInfuseAmt
    }
  }
}
