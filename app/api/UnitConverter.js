const table = {}

/* const prefixes = ['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'da', '', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y']
const factors = [24, 21, 18, 15, 12, 9, 6, 3, 2, 1, 0, -1, -2, -3, -6, -9, -12, -15, -18, -21, -24]
// SI units only, that follow the mg/kg/dg/cg type of format
const units = ['g', 'b', 'l', 'm'] */

const prefixes = ['k', '', 'm']
const factors = [3, 0, -3]
// SI units only, that follow the mg/kg/dg/cg type of format
const units = ['g', 'l']

export default class UnitConverter {
  constructor (value, unit) {
    this.value = value
    if (unit) {
      this.currentUnit = unit
    }

    for (const base of units) {
      for (let i = 0; i < prefixes.length; i++) {
        UnitConverter.addUnit(base, prefixes[i] + base, 10 ** factors[i])
      }
    }

    // we use the SI gram unit as the base; this allows
    // us to convert between SI and English units
    // UnitConverter.addUnit('g', 'ounce', 28.3495231)
    UnitConverter.addUnit('g', 'oz', 28.3495231)
    // UnitConverter.addUnit('g', 'pound', 453.59237)
    UnitConverter.addUnit('g', 'lb', 453.59237)

    UnitConverter.addUnit('l', 'fl-oz', 0.0295735)
    UnitConverter.addUnit('l', 'cup', 0.24)
    UnitConverter.addUnit('l', 'pt', 0.473176)
    UnitConverter.addUnit('l', 'qt', 0.946353)
    UnitConverter.addUnit('l', 'gal', 3.7854)
    UnitConverter.addUnit('l', 'tsp', 0.00492892)
    UnitConverter.addUnit('l', 'tblsp', 0.0147868)

    UnitConverter.addUnit('C', 'F', celcius => celcius * 1.8 + 32)
    UnitConverter.addUnit('F', 'C', fahrenheit => (fahrenheit - 32) / 1.8)

    UnitConverter.addUnit('min', 'min', 1)
    UnitConverter.addUnit('min', 'hour', 60)
    UnitConverter.addUnit('min', 'day', 1440)
    UnitConverter.addUnit('min', 'week', 10080)

    UnitConverter.addUnit('ebc', 'ebc', 1)
    UnitConverter.addUnit('ebc', 'srm', 1.97)
    UnitConverter.addUnit('ebc', 'L', 1.97)

    UnitConverter.addUnit('plato', 'sg', plato => 1 + (plato / (258.6 - ((plato / 258.2) * 227.1))))
    UnitConverter.addUnit('sg', 'plato', sg => (-1 * 616.868) + (1111.14 * sg) - (630.272 * Math.pow(sg, 2)) + (135.997 * Math.pow(sg, 3)))

    UnitConverter.addUnit('bar', 'bar', 1)
    UnitConverter.addUnit('bar', 'psi', 0.0689476)
    UnitConverter.addUnit('bar', 'kpa', 0.01)
  }

  as (targetUnit) {
    this.targetUnit = targetUnit
    return this
  }

  is (currentUnit) {
    this.currentUnit = currentUnit
    return this
  }

  val () {
    if (this.targetUnit === this.currentUnit) return this.value
    else {
      const target = table[this.targetUnit]
      const current = table[this.currentUnit]
      /* if (target.base !== current.base) {
        throw new Error(`Incompatible units; cannot convert from "${this.currentUnit}" to "${this.targetUnit}"`)
      } */
      if (target && current && current.multiplier && target.multiplier) {
        if (typeof target.multiplier === 'function') {
          return target.multiplier(this.value)
        } else {
          return this.value * (current.multiplier / target.multiplier)
        }
      } else {
        return null
      }
    }
  }

  toString () {
    return `${this.val()} ${this.targetUnit}`
  }

  debug () {
    return `${this.value} ${this.currentUnit} is ${this.val()} ${this.targetUnit}`
  }

  static addUnit (baseUnit, actualUnit, multiplier) {
    table[actualUnit] = { base: baseUnit, actual: actualUnit, multiplier }
  }
}

export const Converter = (value, unit) => {
  return new UnitConverter(value, unit)
}
