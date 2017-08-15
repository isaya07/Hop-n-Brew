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

export default class Recipe {
  constructor (config, options) {
    this.name = ''
    this.notes = ''
    this.brewer = ''
    this.asstBrewer = null
    this.type = ''
    this.typeList = ['Extract', 'Partial Mash', 'All Grain']
    this.equipment = new Equipment()
    this.style = new Style()
    this._batchSize = 20
    this._boilSize = 23
    this.calcBoilSize = true
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
    this.date = ''
    this.estOg = null
    this.estFg = null
    this.estColor = null
    this._ibu = null
    this.ibuMethod = 'tinseth'
    this.estAbv = null
    this.abv = null
    this.actualEfficiency = null
    this.calories = null
    this.displayBatchSize = null
    this.displayBoilSize = null
    this.displayOg = null
    this.displayFg = null
    this._config = config
    if (options) {
      Object.assign(this, options)
    }
  }

  get ibu () {
    return this._ibu
  }

  set ibu (value) {
    if (value) {
      // console.log(value)
      this._ibu = value
    }
  }

  get batchSize () {
    return this._batchSize
  }

  set batchSize (value) {
    if (value) {
      this._batchSize = value
      this.updateOg()
    }
  }

  get boilSize () {
    if (this.equipment.calcBoilVolume) {
      return this._batchSize + ((this._batchSize * this.equipment.evapRate / 100) * this.boilTime / 60) + this.equipment.turbChillerLoss
    } else {
      return this._boilSize
    }
  }

  set boilSize (value) {
    if (value !== this._boilSize) {
      this._boilSize = value
      this.updateOg()
    }
  }

  getFementablesTotal () {
    let weight = 0
    for (let i = 0; i < this.fermentables.length; i++) {
      weight += this.fermentables[i].amount
    }
    return weight
  }

  updateOg () {
    if (this.fermentables) {
      let i
      let sugar = 0
      let color = 0
      for (i = 0; i < this.fermentables.length; i++) {
        sugar += this.fermentables[i].getSugar(this.efficiency)
        color += this.fermentables[i].getColor(this._batchSize)
      }
      this.estOg = Utils.roundDecimal(((this._batchSize - (sugar / 1.59) + sugar) / this._batchSize), 3)
      this.estColor = Utils.roundDecimal(color, 1)
      // console.log('OG: ' + this.estOg)
      // console.log('EBC: ' + this.estColor)
    }
  }

  updateFg () {
    let i
    let attenuation = 0
    for (i = 0; i < this.yeasts.length; i++) {
      if (this.yeasts[i].getAttenuation() > attenuation) attenuation = this.yeasts[i].getAttenuation()
    }
    this.estFg = Utils.roundDecimal((((this.estOg - 1) * (1 - (attenuation / 100))) + 1), 3)
    // console.log('FG: ' + this.estFg)
    this.setCalories()
    this.setEstAbv()
  }

  updateIbu () {
    let i
    let bitterness = 0
    for (i = 0; i < this.hops.length; i++) {
      bitterness += this.hops[i].bitterness(this.ibuMethod, this.estOg, this._batchSize)
      // console.log(bitterness)
    }
    this.ibu = Utils.roundDecimal(bitterness, 2)
    // console.log('IBU: ' + this.ibu)
  }

  // alcohol by vol
  setEstAbv () {
    // this.estAbv = 131.25 * (this.estOg - this.estFg)
    // this.estAbv = 133 * (this.estOg - this.estFg) / this.estOg
    this.estAbv = Utils.roundDecimal((76.08 * (this.estOg - this.estFg) / (1.775 - this.estOg)) * (this.estFg / 0.794), 1)
    // console.log('ABV: ' + this.estAbv)
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

  add (type, options) {
    let ret
    let updateFunc
    switch (type) {
      case 'fermentable':
        ret = this.fermentables.push(new Fermentable(this._config, options))
        updateFunc = this.updateOg.bind(this)
        break
      case 'hop':
        ret = this.hops.push(new Hop(this._config, options))
        updateFunc = this.updateIbu.bind(this)
        break
      case 'yeast':
        ret = this.yeasts.push(new Yeast(this._config, options))
        updateFunc = this.updateFg.bind(this)
        break
      case 'misc':
        ret = this.miscs.push(new Misc(this._config, options))
        break
      case 'water':
        ret = this.waters.push(new Water(this._config, options))
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
      estFg: this.estFg,
      estColor: this.estColor,
      ibu: this.ibu
    }
  }
}
