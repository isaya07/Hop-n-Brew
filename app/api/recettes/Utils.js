// const ROOM_TEMP = 23

// const BURNER_ENERGY = 9000

// const MASH_HEAT_LOSS = 5.0
import { Converter } from './../UnitConverter'

const COLOR_NAMES = [
  [ 2, 'pale straw' ],
  [ 3, 'straw' ],
  [ 4, 'yellow' ],
  [ 6, 'gold' ],
  [ 9, 'amber' ],
  [ 14, 'deep amber' ],
  [ 17, 'copper' ],
  [ 18, 'deep copper' ],
  [ 22, 'brown' ],
  [ 30, 'dark brown' ],
  [ 35, 'very dark brown' ],
  [ 40, 'black' ]
]

/* const RELATIVE_SUGAR_DENSITY = {
  cornSugar: 1.0,
  dme: 1.62,
  honey: 0.71,
  sugar: 0.88
} */

export default class Utils {
  static parseDuration = value => {
    var days
    var duration
    var factor
    var factors
    var hours
    var j
    var len
    var min
    var ref
    var sec
    var unit
    var weeks
    duration = 0
    if (!isNaN(value)) {
      return value
    }
    weeks = value.match(/(\d+)\s*w/i)
    days = value.match(/(\d+)\s*d/i)
    hours = value.match(/(\d+)\s*h/i)
    min = value.match(/(\d+)\s*m/i)
    sec = value.match(/(\d+)\s*s/i)
    factors = [
      [ weeks, 7 * 60 * 24 ],
      [ days, 60 * 24 ],
      [ hours, 60 ],
      [ min, 1 ],
      [ sec, 1.0 / 60 ]
    ]
    for (j = 0, len = factors.length; j < len; j++) {
      ref = factors[ j ]
      unit = ref[ 0 ]
      factor = ref[ 1 ]
      if (unit) {
        duration += parseInt(unit[ 1 ]) * factor
      }
    }
    return duration
  }

  static displayDuration = (minutes, approximate) => {
    var amount
    var count
    var durations
    var factor
    var factors
    var j
    var label
    var len
    var ref
    var ref1
    durations = []
    factors = [
      [ 'month', 30 * 60 * 24 ],
      [ 'week', 7 * 60 * 24 ],
      [ 'day', 60 * 24 ],
      [ 'hour', 60 ],
      [ 'minute', 1 ]
    ]
    count = 0
    for (j = 0, len = factors.length; j < len; j++) {
      ref = factors[ j ]
      label = ref[ 0 ]
      factor = ref[ 1 ]
      if (factor === 1 || ((approximate != null) && count === approximate - 1)) {
        amount = Math.round(minutes / factor)
      } else {
        amount = Math.floor(minutes / factor)
      }
      minutes = minutes % factor
      if (amount > 0 || count > 0) {
        count++
      }
      if ((approximate != null) && count > approximate) {
        break
      }
      if (amount > 0) {
        durations.push(amount + ' ' + label + ((ref1 = (amount !== 1 ? 's' : void 0)) != null ? ref1 : ''))
      }
    }
    if (!durations.length) {
      durations = [ 'start' ]
    }
    return durations.join(' ')
  }

  static roundDecimal = (nombre, precision = 2) => {
    // let preci = precision || 2
    var tmp = Math.pow(10, precision)
    return Math.round(nombre * tmp) / tmp
  }

  /*
  Conversion functions ---------------------------------------------------------
   */
  static convertTemp = displayTemp => {
    let value = {}
    let ref = displayTemp.split(' ')
    switch (ref[1]) {
      case 'C':
        value.temp = ref[0]
        break
      case 'F':
        value.temp = Utils.fToC(ref[0])
        break
      default:
        value.temp = 0
    }
    value.unitie = 'C'
    return value
  }

  static convertTempTo = (displayTemp, unit, dec = 1) => {
    let ref = displayTemp.split(' ')
    return Converter(Utils.roundDecimal(ref[0], dec), ref[1]).as(unit).val()
  }

  static convertWeightTo = (displayWeight, unit, dec = 1) => {
    let ref = displayWeight.split(' ')
    return Converter(Utils.roundDecimal(ref[0], dec), ref[1]).as(unit).val()
  }

  static convertVolTo = (displayVol, unit, dec = 1) => {
    let ref = displayVol.split(' ')
    if (ref[1] === 'oz') ref[1] = 'fl-oz'
    if (unit === 'oz') unit = 'fl-oz'
    return Converter(Utils.roundDecimal(ref[0], dec), ref[1]).as(unit).val()
  }

  static convertVol = displayVol => {
    let value = {}
    let ref = displayVol.split(' ')
    switch (ref[1]) {
      case 'l':
        value.value = ref[0]
        break
      case 'gal':
        value.value = Utils.gallonsToLiters(ref[0])
        break
      default:
        value.value = 0
    }
    value.unitie = 'l'
    return value
  }

  static convertTime = displayTime => {
    let ref = displayTime.split(' ')
    switch (ref[1]) {
      case 'min':
        return ref[0]
      case 'hour':
        return ref[0] * 60
      case 'day':
        return ref[0] * 60 * 24
      case 'week':
        return ref[0] * 60 * 24 * 7
    }
  }

  static convertWeight = displayWeight => {
    let ref = displayWeight.split(' ')
    switch (ref[1]) {
      case 'kg':
        return ref[0]
      case 'g':
        return ref[0] / 1000
      case 'oz':
        return Utils.ozToKg(ref[0])
      case 'lb':
        return Utils.lbToKg(ref[0])
    }
  }

  static convertColor = displayColor => {
    let ref = displayColor.split(' ')
    switch (ref[1]) {
      case 'ebc':
        return ref[0]
      case 'srm':
        return Utils.srmToEbc(ref[0])
      case 'L':
        return Utils.srmToEbc(Utils.lovibondToSrm(ref[0]))
    }
  }

  static kgToLb = kg => kg * 2.20462

  static kgToOz = kg => kg * 35.27396

  static lbToKg = lb => lb / 2.20462

  static kgToLbOz = kg => {
    var lb
    lb = Utils.kgToLb(kg)
    return {
      lb: Math.floor(lb),
      oz: (lb - Math.floor(lb)) * 16.0
    }
  }

  static lbOzToKg = (lb, oz) => Utils.lbToKg(lb + (oz / 16.0))

  static ozToKg = oz => oz / 35.27396

  static litersToGallons = liters => liters * 0.264172

  static gallonsToLiters = gallons => gallons / 0.264172

  static onceToLiter = once => once / 33.814

  static literToOnce = liter => liter * 33.814

  static litersPerKgToQuartsPerLb = litersPerKg => litersPerKg * 0.479305709

  static quartsPerLbToLitersPerKg = quartsPerLb => quartsPerLb / 0.479305709

  static cToF = celcius => celcius * 1.8 + 32

  static fToC = fahrenheit => (fahrenheit - 32) / 1.8

  static yieldToPpg = yieldPercentage => yieldPercentage * 0.46214

  static ppgToYield = ppg => ppg * 2.16385

  static sgToPlato = sg => (-1 * 616.868) + (1111.14 * sg) - (630.272 * Math.pow(sg, 2)) + (135.997 * Math.pow(sg, 3))

  static platoToSg = plato => 1 + (plato / (258.6 - ((plato / 258.2) * 227.1)))
  /*
  Color functions --------------------------------------------------------------
   */

  static srmToEbc = srm => srm * 1.97

  static ebcToSrm = ebc => ebc * 0.508

  static srmToLovibond = srm => (srm + 0.76) / 1.3546

  static lovibondToSrm = lovibond => 1.3546 * lovibond - 0.76

  static srmToRgb = srm => {
    var b
    var g
    var r
    r = Math.round(Math.min(255, Math.max(0, 255 * (0.975 ** srm))))
    g = Math.round(Math.min(255, Math.max(0, 245 * (0.88 ** srm))))
    b = Math.round(Math.min(255, Math.max(0, 220 * (0.7 ** srm))))
    return [ r, g, b ]
  }

  static srmToCss = srm => {
    var b
    var g
    var r
    var ref

    ref = Utils.srmToRgb(srm)
    r = ref[ 0 ]
    g = ref[ 1 ]
    b = ref[ 2 ]

    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }

  static srmToName = srm => {
    var color
    var item
    var j
    var len
    var ref
    color = COLOR_NAMES[ 0 ][ 1 ]
    ref = COLOR_NAMES
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[ j ]
      if (item[ 0 ] <= srm) {
        color = item[ 1 ]
      }
    }
    return color
  }

  static timeToHeat = (liters, degrees, energy) => {
    var kj
    var minutes
    if (degrees == null) {
      degrees = 80
    }
    kj = 4.19 * liters * degrees
    minutes = kj / energy * 60
    return minutes
  }

  /*
   * Display helper
  */
  static extarctDisplayValue = dValue => {
    let value = []
    let splitted = []
    if (dValue instanceof String) {
      splitted = dValue.split(' ')
      value.weight = parseFloat(splitted[0])
      value.unitie = splitted[1]
    } else {
      value.weight = parseFloat(dValue)
      // value.unitie =  //TODO add default unitie
    }
    return value
  }

  static isType = (type, val) => val.constructor.name.toLowerCase() === type
}
