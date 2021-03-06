import Event from './event'

import Fermentable from './Fermentable'
import Hop from './Hop'
import Yeast from './Yeast'
import Misc from './Misc'
import Water from './Water'
import Mash from './Mash'
import Fermentation from './Fermentation'
import Carbonation from './Carbonation'
import Equipment from './Equipment'
import Style from './Style'
import Utils from './Utils'
import {importXML, exportXML} from './Import'

const typeList = ['Extract', 'Partial Mash', 'All Grain']

export default class Recipe {
  constructor (config, options) {
    // super()
    // clear event system
    // Event.removeAllListeners('mash_event')

    this.name = 'New Recipe'
    this.notes = ''
    this.brewer = 'You'
    this.asstBrewer = 'Hop\'n Brew'
    this.type = 'All Grain'
    this.equipment = new Equipment()
    this.style = new Style()
    this.batchSize = 20
    this.boilSize = 23
    this.boilTime = 60
    this.efficiency = 75
    this.fermentables = []
    this.yeasts = []
    this.hops = []
    this.miscs = []
    this.waters = []
    this.mash = new Mash(config, {recipe: this})
    this.fermentation = new Fermentation()
    this.carbonation = new Carbonation()
    this.og = 0
    this.fg = 0
    this.tasteNote = ''
    this.tasteRating = ''
    this.date = Utils.getDate()
    this.estOg = null
    this.estFg = null
    this.estColor = null
    this.ibu = null
    this.ibuMethod = 'Tinseth' // Rager'
    this.estAbv = null
    this.abv = null
    this.actualEfficiency = null
    this.calories = null
    this.displayBatchSize = null
    this.displayBoilSize = null
    this.displayOg = null
    this.displayFg = null
    this._config = config
    // this.event = Event
    if (options) {
      if (options.fermentables && options.fermentables.length !== 0) {
        let temp = []
        for (let i = 0; i < options.fermentables.length; i++) {
          temp.push(new Fermentable(Object.assign(options.fermentables[i], {parent: this})))
        }
        options.fermentables = temp
      }
      if (options.hops && options.hops.length !== 0) {
        let temp = []
        for (let i = 0; i < options.hops.length; i++) {
          temp.push(new Hop(Object.assign(options.hops[i], {parent: this})))
        }
        options.hops = temp
      }
      if (options.yeasts && options.yeasts.length !== 0) {
        let temp = []
        for (let i = 0; i < options.yeasts.length; i++) {
          temp.push(new Yeast(options.yeasts[i]))
        }
        options.yeasts = temp
      }
      if (options.miscs && options.miscs.length !== 0) {
        let temp = []
        for (let i = 0; i < options.miscs.length; i++) {
          temp.push(new Misc(options.miscs[i]))
        }
        options.miscs = temp
      }
      if (options.waters && options.waters.length !== 0) {
        let temp = []
        for (let i = 0; i < options.waters.length; i++) {
          temp.push(new Water(options.waters[i]))
        }
        options.waters = temp
      }
      if (options.equipment) {
        options.equipment = new Equipment(options.equipment)
      }
      if (options.mash) {
        options.mash = new Mash(this._config, Object.assign(options.mash, {recipe: this}))
        // this.setMash(options.mash)
        // this.mash = new Mash(config, Object.assign(options.mash, {recipe: this}))
        // console.log(options.mash, this.mash)
      }
      Object.assign(this, options)
    }
    this.updateOg()
    this.updateIbu()
    // subscribe event
    // Event.on('event', this.test)
  }

  test = (test) => {
    console.log('Recipe event', test, Event)
  }

  setMash = (mash) => {
    this.mash = new Mash(this._config, Object.assign(mash, {recipe: this}))
  }

  getTypeList () {
    return typeList
  }

  /**
   * Getter/Setter
   */
  getBatchSize (unit = 'l') {
    if (this.displayBatchSize) {
      return Utils.convertTo(this.displayBatchSize, unit)
    } else {
      return this.batchSize
    }
  }
  setBatchSize (val, unit = 'l') {
    this.batchSize = val
    this.displayBatchSize = val + ' ' + unit
  }

  getBoilSize (unit = 'l') {
    if (this.equipment.calcBoilVolume) this.calculBoilSize()
    if (this.displayBoilSize) {
      return Utils.convertTo(this.displayBoilSize, unit)
    } else {
      return this.boilSize
    }
  }
  setBoilSize (val, unit = 'l') {
    this.boilSize = val
    this.displayBoilSize = val + ' ' + unit
  }

  getOg (unit) {
    if (this.displayOg) {
      return Utils.convertTo(this.displayOg, unit)
    } else {
      return this.og
    }
  }
  setOg (val, unit) {
    this.og = val
    this.displayOg = val + ' ' + unit
  }

  getFg (unit) {
    if (this.displayFg) {
      return Utils.convertTo(this.displayFg, unit)
    } else {
      return this.fg
    }
  }
  setFg (val, unit) {
    this.fg = val
    this.displayFg = val + ' ' + unit
  }

  getEstOg (unit = 'sg') {
    if (!this.estOg) this.updateOg()
    // console.log(this.estOg, unit)
    return Utils.convertTo(this.estOg, unit, 3)
  }
  setEstOg (val, unit = 'sg') {
    this.estOg = val + ' ' + unit
  }

  getEstFg (unit) {
    if (!this.estFg) this.updateFg()
    return Utils.convertTo(this.estFg, unit, 3)
  }
  setEstFg (val, unit) {
    this.estFg = val + ' ' + unit
  }

  getEstAbv () {
    if (this.estAbv) {
      if (Utils.isType('string', this.estAbv)) {
        return Utils.roundDecimal(this.estAbv.split(' ')[0], 1)
      } else {
        return this.estAbv
      }
    } else {
      let abv = this.calculAbv()
      this.setEstAbv(abv)
      return abv
    }
  }
  setEstAbv (val) {
    this.estAbv = val + ' %'
  }

  getIbu () {
    if (this.ibu && Utils.isType('string', this.ibu)) {
      return Utils.roundDecimal(this.ibu.split(' ')[0], 1)
    } else {
      return this.ibu
    }
  }

  setIbu (value) {
    this.ibu = value + ' IBUs'
  }
  /**
   * Calculate
   */
  getFementablesTotal () {
    let weight = 0
    for (let i = 0; i < this.fermentables.length; i++) {
      weight += this.fermentables[i].amount
    }
    return weight
  }
  // alcohol by vol
  calculAbv () {
    // this.estAbv = 131.25 * (this.estOg - this.estFg)
    // this.estAbv = 133 * (this.estOg - this.estFg) / this.estOg
    return Utils.roundDecimal((76.08 * (this.estOg - this.estFg) / (1.775 - this.estOg)) * (this.estFg / 0.794), 1)
    // console.log('ABV: ' + this.estAbv)
  }

  getVolLost () {
    return this.equipment.trubChillerLoss + this.equipment.lauterDeadspace
  }

  getVolEvap () {
    // console.log('evap : ', ((this.batchSize / (1 - (this.equipment.evapRate / 100))) * this.boilTime / 60) - this.batchSize)
    return this.batchSize * (this.equipment.evapRate / 100) * this.boilTime / 60
  }

  calculBoilSize () {
    let boil = Utils.roundDecimal((this.batchSize + this.getVolEvap() + this.getVolLost()) * 1.04, 1) // 1.04 coefficient de rétraction du moût entre 100°C et 20°C
    this.setBoilSize(boil, 'l')
  }

  updateOg () {
    // this.fermentables.sort(this.fermentableSort)
    if (this.fermentables.length !== 0) {
      let i
      let sugar = 0
      let color = 0
      // console.log(this.fermentables)
      for (i = 0; i < this.fermentables.length; i++) {
        sugar += this.fermentables[i].calcSugar(this.efficiency)
        color += this.fermentables[i].calcColor(this.batchSize)
      }
      // console.log(sugar)
      this.estOg = Utils.roundDecimal(((this.batchSize - (sugar / 1.59) + sugar) / this.batchSize), 3)
      this.estColor = Utils.roundDecimal(color, 1)
      // console.log('OG: ' + this.estOg)
      // console.log('EBC: ' + this.estColor)
      this.updateFg()
    }
  }

  updateFg () {
    let i
    let attenuation = 0
    if (this.yeasts.length !== 0) {
      // this.yeasts.sort(this.yeastSort)
      for (i = 0; i < this.yeasts.length; i++) {
        if (this.yeasts[i].getAttenuation() > attenuation) attenuation = this.yeasts[i].getAttenuation()
      }
    } else {
      attenuation = 75
    }
    this.estFg = Utils.roundDecimal((((this.estOg - 1) * (1 - (attenuation / 100))) + 1), 3)
    // console.log('FG: ' + this.estFg)
    this.setCalories()
    // this.setEstAbv(this.calculAbv())
  }

  updateIbu () {
    if (this.hops.length !== 0) {
      // this.hops.sort(this.hopSort)
      let i
      let bitterness = 0
      for (i = 0; i < this.hops.length; i++) {
        bitterness += this.hops[i].getBitterness(this.ibuMethod.toLowerCase(), this.estOg, this.getBatchSize()/* , 10 */) // TODO whirpool
      }
      this.setIbu(Utils.roundDecimal(bitterness, 1))
    }
  }

  setCalories () {
    let temp
    let ogPlato
    let fgPlato
    let realExtract
    let abw
    ogPlato = Utils.sgToPlato(this.estOg)
    fgPlato = Utils.sgToPlato(this.estFg)
    realExtract = (0.1808 * ogPlato) + (0.8192 * fgPlato)
    abw = (ogPlato - realExtract) / (2.0665 - (0.010665 * ogPlato))
    temp = ((6.9 * abw) + 4 * (realExtract - 0.1)) * this.estFg * 3.55
    if (temp < 0) temp = 0
    this.calories = temp * (1 / Utils.onceToLiter(12)) // 12once 0.354L
    // console.log('Calorie: ' + this.calories)
  }

  fermentableSort = (a, b) => {
    if (a.amount < b.amount) return 1
    if (a.amount > b.amount) return -1
    return 0
  }

  hopSort = (a, b) => {
    if (a.time === b.time) {
      if (a.use === b.use) {
        return (a.amount > b.amount) ? -1 : (a.amount < b.amount) ? 1 : 0
      } else {
        return (a.use > b.use) ? -1 : 1
      }
    } else {
      return (a.time > b.time) ? -1 : 1
    }
  }

  yeastSort = (a, b) => {
    if (a.attenuation < b.attenuation) return 1
    if (a.attenuation > b.attenuation) return -1
    return 0
  }

  /* getIngredientList (type) {
    switch (type) {
      case 'fermentable':
        return this.fermentables.sort(this.fermentableSort)
      case 'hop':
        return this.hops.sort(this.hopSort)
      case 'yeast':
        return this.yeasts.sort(this.yeastSort)
      case 'misc':
        return this.miscs
      case 'water':
        return this.waters
    }
  } */

  add (type, options) {
    let ret
    let updateFunc
    switch (type) {
      case 'fermentable':
        ret = this.fermentables.push(new Fermentable(Object.assign(options, {parent: this})))
        // this.fermentables.sort(this.ingredientSort)
        updateFunc = this.updateOg.bind(this)
        break
      case 'hop':
        ret = this.hops.push(new Hop(Object.assign(options, {parent: this})))
        // this.hops.sort(this.hopSort)
        updateFunc = this.updateIbu.bind(this)
        break
      case 'yeast':
        ret = this.yeasts.push(new Yeast(options))
        updateFunc = this.updateFg.bind(this)
        break
      case 'misc':
        ret = this.miscs.push(new Misc(options))
        break
      case 'water':
        ret = this.waters.push(new Water(options))
        break
    }
    if (updateFunc) updateFunc()
    return ret
  }

  remove (type, ingredient) {
    let lists
    let updateFunc
    switch (type) {
      case 'fermentable':
        lists = this.fermentables
        updateFunc = this.updateOg.bind(this)
        break
      case 'hop':
        lists = this.hops
        updateFunc = this.updateIbu.bind(this)
        break
      case 'yeast':
        lists = this.yeasts
        updateFunc = this.updateFg.bind(this)
        break
      case 'misc':
        lists = this.miscs
        break
      case 'water':
        lists = this.waters
        break
    }
    for (let i = 0; i < lists.length; i++) {
      if (JSON.stringify(lists[i]) === JSON.stringify(ingredient)) {
      // if (lists[i].name === name) {
        lists.splice(i, 1)
      }
    }
    if (updateFunc) updateFunc()
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'recipe')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'recipe', inRecipe)
  }

  toJSON () {
    return {
      name: this.name,
      notes: this.notes,
      brewer: this.brewer,
      type: this.type,
      equipment: this.equipment,
      style: this.style,
      batchSize: this.batchSize,
      boilSize: this.boilSize,
      boilTime: this.boilTime,
      efficiency: this.efficiency,
      fermentables: this.fermentables,
      yeasts: this.yeasts,
      hops: this.hops,
      misc: this.misc,
      waters: this.waters,
      mash: this.mash,
      fermentation: this.fermentation,
      carbonation: this.carbonation,
      og: this.og,
      fg: this.fg,
      tasteNote: this.tasteNote,
      tasteRating: this.tasteRating,
      date: this.date,
      estOg: this.estOg,
      estAbv: this.estAbv,
      estFg: this.estFg,
      estColor: this.estColor,
      ibu: this.ibu
    }
  }
}
