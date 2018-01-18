import {importXML, exportXML} from './Import'

const typeList = ['Lager', 'Ale', 'Mead', 'Wheat', 'Mixed', 'Cider']

export default class Style {
  constructor (options) {
    this.name = null
    this.category = null
    this.categoryNumber = null
    this.styleLetter = null
    this.styleGuide = null
    this.type = null
    this.ogMin = null
    this.ogMax = null
    this.fgMin = null
    this.fgMax = null
    this.ibuMin = null
    this.ibuMax = null
    this.colorMin = null
    this.colorMax = null
    this.carbMin = null
    this.carbMax = null
    this.abvMin = null
    this.abvMax = null
    this.notes = null
    this.profile = null
    this.ingredients = null
    this.examples = null
    this.displayOgMin = null
    this.displayOgMax = null
    this.displayFgMin = null
    this.displayFgMax = null
    this.displayColorMin = null
    this.displayColorMax = null
    this.ogRange = null
    this.fgRange = null
    this.ibuRange = null
    this.carbRange = null
    this.colorRange = null
    this.abvRange = null
    if (options) {
      Object.assign(this, options)
    }
  }

  static getTypeList () {
    return typeList
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'style')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'style', inRecipe)
  }

  /* toJSON () {
  } */
}
