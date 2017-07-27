export default class Fermentation {
  constructor (options) {
    this.fermentationStages = null
    this.primaryAge = null
    this.primaryTemp = null
    this.secondaryAge = null
    this.secondaryTemp = null
    this.tertiaryAge = null
    this.tertiaryTemp = null
    this.age = null
    this.ageTemp = null
    if (options) {
      Object.assign(this, options)
    }
  }

  /* toJSON () {
  } */
}
