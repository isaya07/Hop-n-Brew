import Utils from './Utils'
import {importXML, exportXML} from './Import'

export default class Equipment {
  constructor (options) {
    this.name = 'default'
    this.boilSize = 23
    this.batchSize = 20
    this.tunVolume = null
    this.tunWeight = null
    this.tunSpecificHeat = null
    this.topUpWater = null
    this.trubChillerLoss = 1
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

  getBoilSize (unit) {
    if (this.displayBoilSize) {
      return Utils.convertTo(this.displayBoilSize, unit)
    } else {
      return this.boilSize
    }
  }

  setBoilSize (val, unit) {
    this.boilSize = val
    this.displayBoilSize = val + ' ' + unit
  }

  getBatchSize (unit) {
    if (this.displayBatchSize) {
      return Utils.convertTo(this.displayBatchSize, unit)
    } else {
      return this.batchSize
    }
  }

  setBatchSize (val, unit) {
    this.batchSize = val
    this.displayBatchSize = val + ' ' + unit
  }

  getTunVolume (unit) {
    if (this.displayTunVolume) {
      return Utils.convertTo(this.displayTunVolume, unit)
    } else {
      return this.tunVolume
    }
  }

  setTunVolume (val, unit) {
    this.tunVolume = val
    this.displayTunVolume = val + ' ' + unit
  }

  getTunWeight (unit) {
    if (this.displayTunWeight) {
      return Utils.convertTo(this.displayTunWeight, unit)
    } else {
      return this.tunWeight
    }
  }

  setTunWeight (val, unit) {
    this.tunWeight = val
    this.displayTunWeight = val + ' ' + unit
  }

  getTopUpWater (unit) {
    if (this.displayTopUpWater) {
      return Utils.convertVolTo(this.displayTopUpWater, unit)
    } else {
      return this.topUpWater
    }
  }

  setTopUpWater (val, unit) {
    this.topUpWater = val
    this.displayTopUpWater = val + ' ' + unit
  }

  getTurbChillerLoss (unit) {
    if (this.displayTurbChillerLoss) {
      return Utils.convertVolTo(this.displayTurbChillerLoss, unit)
    } else {
      return this.turbChillerLoss
    }
  }

  setTurbChillerLoss (val, unit) {
    this.turbChillerLoss = val
    this.displayTurbChillerLoss = val + ' ' + unit
  }

  getLauterDeadspace (unit) {
    if (this.displayLauterDeadspace) {
      return Utils.convertVolTo(this.displayLauterDeadspace, unit)
    } else {
      return this.lauterDeadspace
    }
  }

  setLauterDeadspace (val, unit) {
    this.lauterDeadspace = val
    this.displayLauterDeadspace = val + ' ' + unit
  }

  getTopUpKettle (unit) {
    if (this.topUpKettle) {
      return Utils.convertVolTo(this.displayTopUpKettle, unit)
    } else {
      return this.lauterDeadspace
    }
  }

  setTopUpKettle (val, unit) {
    this.topUpKettle = val
    this.displayTopUpKettle = val + ' ' + unit
  }

  static fromBeerXml (xml) {
    return importXML(xml, 'equipment')
  }

  toBeerXml = (inRecipe = false) => {
    return exportXML(this.toJSON(), 'equipment', inRecipe)
  }
  /* toJSON () {
  } */
}
