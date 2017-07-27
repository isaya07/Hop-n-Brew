export default class Equipment {
  constructor (options) {
    this.name = 'default'
    this.boilSize = 20
    this.batchSize = 23
    this.tunVolume = null
    this.tunWeight = null
    this.tunSpecificHeat = null
    this.topUpWater = null
    this.turbChillerLoss = 1
    this.evapRate = 10
    this.boilTime = null
    this.calcBoilVolume = true
    this.lauterDeadspace = null
    this.topUpKettle = null
    this.hopUtilization = null
    this.notes = ''
    this.displayBoilSize = ''
    this.displayBatchSize = ''
    this.displayTunVolume = ''
    this.displayTunWeight = ''
    this.displayTopUpWater = ''
    this.displayTrubChillerLoss = ''
    this.displayLauterDeadspace = ''
    this.displayTopUpKettle = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  /* toJSON () {
  } */
}
