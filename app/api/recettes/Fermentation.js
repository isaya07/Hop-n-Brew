import Utils from './Utils'
import {importXML, exportXML} from './Import'

const stagesList = [
  { text: 'Simple', value: 1 },
  { text: 'Double', value: 2 },
  { text: 'Triple', value: 3 }
]

export default class Fermentation {
  constructor (options) {
    this.name = ''
    this.fermentationStages = null
    this.primaryAge = null
    this.primaryTemp = null
    this.secondaryAge = null
    this.secondaryTemp = null
    this.tertiaryAge = null
    this.tertiaryTemp = null
    this.age = null
    this.ageTemp = null
    this.displayPrimaryTemp = ''
    this.displaySecondaryTemp = ''
    this.displayTertiaryTemp = ''
    this.displayAgeTemp = ''
    this.notes = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  getStagesList () {
    return stagesList
  }

  getPrimaryTemp (unit) {
    if (this.displayPrimaryTemp) {
      return Utils.convertTempTo(this.displayPrimaryTemp, unit)
    } else {
      return this.primaryTemp
    }
  }

  setPrimaryTemp (val, unit) {
    this.primaryTemp = val
    this.displayPrimaryTemp = val + ' ' + unit
  }

  getSecondaryTemp (unit) {
    if (this.displaySecondaryTemp) {
      return Utils.convertTempTo(this.displaySecondaryTemp, unit)
    } else {
      return this.secondaryTemp
    }
  }

  setSecondaryTemp (val, unit) {
    this.secondaryTemp = val
    this.displaySecondaryTemp = val + ' ' + unit
  }

  getTertiaryTemp (unit) {
    if (this.displayTertiaryTemp) {
      return Utils.convertTempTo(this.displayTertiaryTemp, unit)
    } else {
      return this.tertiaryTemp
    }
  }

  setTertiaryTemp (val, unit) {
    this.tertiaryTemp = val
    this.displayTertiaryTemp = val + ' ' + unit
  }

  getAgeTemp (unit) {
    if (this.displayAgeTemp) {
      return Utils.convertTempTo(this.displayAgeTemp, unit)
    } else {
      return this.ageTemp
    }
  }

  setAgeTemp (val, unit) {
    this.ageTemp = val
    this.displayAgeTemp = val + ' ' + unit
  }

  /* toJSON () {
    return {
      name: this.name,
      fermentationStages: this.fermentationStages,
      primaryAge: this.primaryAge,
      primaryTemp: this.primaryTemp,
      secondaryAge: this.secondaryAge,
      secondaryTemp: this.secondaryTemp,
      tertiaryAge: this.tertiaryAge,
      tertiaryTemp: this.tertiaryTemp,
      age: this.age,
      ageTemp: this.ageTemp,
      displayPrimaryTemp: this.displayPrimaryTemp,
      displaySecondaryTemp: this.displaySecondaryTemp,
      displayTertiaryTemp: this.displayTertiaryTemp,
      displayAgeTemp: this.displayAgeTemp,
      notes: this.notes
    }
  } */

  static fromBeerXml (xml) {
    return importXML(xml, 'water')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'water', inRecipe)
  }
}
