import MashStep from './MashStep'
import {importXml, htmlEncode, camelize, underscorize} from './Import'
import Utils from 'api/recettes/Utils'

const isType = (type, val) => val.constructor.name.toLowerCase() === type

export default class Mash {
  constructor (config, options) {
    this.name = ''
    this._grainTemp = 20
    this.mashSteps = []
    this.notes = ''
    this._tunTemp = 20
    this._spargeTemp = 77
    // this.spargeVol = 0
    this.empatSize = 0
    this.ph = 5.4
    this._tunWeight = null
    this.tunSpecificHeat = null
    this.equipAdjust = false
    this.displayGrainTemp = ''
    this.displayTunTemp = ''
    this.displaySpargeTemp = ''
    this.displayTunWeight = ''
    this._config = config
    if (options) {
      if (options.mashSteps && options.mashSteps.length !== 0) {
        let steps = []
        if (isType('array', options.mashSteps)) {
          for (let i = 0; i < options.mashSteps.length; i++) {
            let step = options.mashSteps[i]
            steps.push(new MashStep(config, Object.assign(step, {mash: this})))
          }
        } else if (isType('object', options.mashSteps)) {
          for (let step in this.mashSteps) {
            steps.push(new MashStep(config, Object.assign(step, {mash: this})))
          }
        }
        options.mashSteps = steps
      }
      Object.assign(this, options)
    }
    this.calcData()
  }

  get spargeVol () {
    let stepsNum = this.mashSteps.length
    if (stepsNum !== 0) {
      // console.log(stepsNum, this.mashSteps)
      let grains = this.recipe.getFementablesTotal()
      let ratio = this.mashSteps[stepsNum - 1]._waterGrainRatio
      // console.log(grains, ratio, grains * ratio)
      return this.recipe.boilSize - grains * ratio
    }
  }

  set grainTemp (val) {
    if (val) {
      this._grainTemp = val
      this.displayGrainTemp = val + ' ' + this._config.tempUnitie
    }
  }

  get grainTemp () {
    if (this.displayGrainTemp) {
      return Utils.convertTemp(this.displayGrainTemp).temp
    } else {
      return this._grainTemp
    }
  }

  set tunTemp (val) {
    if (val) {
      this._tunTemp = val
      this.displayTunTemp = val + ' ' + this._config.tempUnitie
    }
  }

  get tunTemp () {
    if (this.displayTunTemp) {
      return Utils.convertTemp(this.displayTunTemp).temp
    } else {
      return this._tunTemp
    }
  }

  set tunWeight (val) {
    if (val) {
      this._tunWeight = val
      this.displayTunWeight = val + ' ' + this._config.weightUnitie
    }
  }

  get tunWeight () {
    if (this.displayTunWeight) {
      return Utils.convertWeight(this.displayTunWeight)
    } else {
      return this._tunWeight
    }
  }

  set spargeTemp (val) {
    if (val) {
      this._spargeTemp = val
      this.displaySpargeTemp = val + ' ' + this._config.tempUnitie
    }
  }

  get spargeTemp () {
    if (this.displaySpargeTemp) {
      return Utils.convertTemp(this.displaySpargeTemp).temp
    } else {
      return this._spargeTemp
    }
  }

  updateStepWaterRatio = (stepName, ratio) => {
    for (let i = 0; i < this.mashSteps.length; i++) {
      if (this.mashSteps[i].name !== stepName) {
        this.mashSteps[i].waterGrainRatio = ratio
      }
    }
  }

  calcData = () => {
    for (let i = 0; i < this.mashSteps.length; i++) {
      this.mashSteps[i].calcData()
    }
  }

  calcEmpatVol = () => {
    let stepsVol
    for (let i = 0; i < this.mashSteps.length; i++) {
      if (this.mashSteps[i].type.toLowerCase() === 'infusion') {
        stepsVol += this.mashSteps[i].infuseAmount
      }
    }
    this.empatSize = stepsVol
  }

  calcSpargeVol = () => {
    let stepsNum = this.mashSteps.length
    if (stepsNum !== 0) {
      console.log(stepsNum, this.mashSteps)
      let grains = this.recipe.getFementablesTotal()
      let ratio = this.mashSteps[stepsNum - 1].waterGrainRatio
      console.log(ratio)
      this.spargVol = this.recipe.boilSize - grains * (ratio - 1)
    }
  }

  stepSort = (a, b) => {
    if (a.stepTemp < b.stepTemp) return -1
    if (a.stepTemp > b.stepTemp) return 1
    return 0
  }

  add = (options) => {
    if (options) {
      Object.assign(options, {mash: this})
    } else {
      options = {mash: this}
    }
    this.mashSteps.push(new MashStep(this._config, options))
    this.mashSteps.sort(this.stepSort)
  }

  remove = (id) => {
    this.mashSteps.splice(id, 1)
    this.mashSteps.sort(this.stepSort)
  }

  toJSON = () => {
    return {
      name: this.name,
      grainTemp: this._grainTemp,
      mashSteps: this.mashSteps,
      notes: this.notes,
      tunTemp: this._tunTemp,
      spargeTemp: this._spargeTemp,
      spargeSize: this.spargeSize,
      ph: this.ph,
      tunWeight: this._tunWeight,
      tunSpecificHeat: this.tunSpecificHeat,
      equipAdjust: this.equipAdjust,
      displayGrainTemp: this.displayGrainTemp,
      displayTunTemp: this.displayTunTemp,
      displaySpargeTemp: this.displaySpargeTemp,
      displayTunWeight: this.displayTunWeight
    }
  }

  static fromBeerXml = (xml, recepice, config) => {
    let mash = new Mash(config)
    // let options = {}
    mash['recipe'] = recepice
    importXml(xml, 'mash', (props) => {
      if (props.nodeName !== '#text') {
        let propsName = camelize(props.nodeName)
        if (propsName === 'mashSteps') {
          mash[propsName] = MashStep.fromNodes(props, mash, config)
        } else {
          if (!isNaN(props.textContent)) {
            mash[propsName] = +props.textContent
          } else {
            mash[propsName] = props.textContent
          }
        }
      }
    })
    // console.log(this, options)
    // Object.assign(this, options)
    // console.log(this)
    return mash
  }

  toBeerXml = (inRecipe = false) => {
    let mash = this.toJSON()
    let xml = '<?xml version="1.0" encoding="ISO-8859-1"?>\n'
    if (!inRecipe) xml += '<MASHS>\n'
    xml += '<MASH>\n<VERSION>1</VERSION>\n'
    for (let key in mash) {
      if (mash.hasOwnProperty(key)) {
        let ref1 = underscorize(key).toUpperCase()
        if (key === 'mashSteps') {
          xml += '<' + ref1 + '>\n'
          for (let step in mash[key]) {
            xml += '<MASH_STEP>\n'
            for (let prop in mash[key][step].toJSON()) {
              let ref2 = underscorize(prop).toUpperCase()
              xml += '<' + ref2 + '>' + htmlEncode(mash[key][step][prop]) + '</' + ref2 + '>\n'
            }
            xml += '</MASH_STEP>\n'
          }
          xml += '</' + ref1 + '>\n'
        } else if (key !== 'spargeSize') {
          xml += '<' + ref1 + '>' + htmlEncode(mash[key]) + '</' + ref1 + '>\n'
        }
      }
    }
    xml += '\n</MASH>\n'
    if (!inRecipe) xml += '</MASHS>'
    // let objUrl = window.URL.createObjectURL(blob)
    // window.open(uriContent, 'test.xml')
    return xml
  }
}
