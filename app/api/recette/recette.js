/*
@preserve
Recette.js Beer Calculator
Copyright 2014 Daniel G. Taylor <danielgtaylor@gmail.com>
https://github.com/homebrewing/Recettejs
 */
var hasProp = {}.hasOwnProperty

var indexOf = [].indexOf || function (item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[ i ] === item) return i
  }
  return -1
}

const extend = (child, parent) => {
  for (var key in parent) {
    if (hasProp.call(parent, key)) child[ key ] = parent[ key ]
  }

  function Ctor () {
    this.constructor = child
  }
  Ctor.prototype = parent.prototype
  child.prototype = new Ctor()
  child.__super__ = parent.prototype

  return child
}

const tanh = number => (Math.exp(number) - Math.exp(-number)) / (Math.exp(number) + Math.exp(-number))

const Recette = (typeof exports !== 'undefined' && exports !== null) && exports || (this.Recette = {})

/*
Global constants -------------------------------------------------------------
 */

Recette.ROOM_TEMP = 23

Recette.BURNER_ENERGY = 9000

Recette.MASH_HEAT_LOSS = 5.0

Recette.COLOR_NAMES = [
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

Recette.RELATIVE_SUGAR_DENSITY = {
  cornSugar: 1.0,
  dme: 1.62,
  honey: 0.71,
  sugar: 0.88
}

/*
Simple parsing functions -----------------------------------------------------
 */

Recette.parseDuration = value => {
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

Recette.displayDuration = (minutes, approximate) => {
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

/*
Conversion functions ---------------------------------------------------------
 */

Recette.kgToLb = kg => kg * 2.20462

Recette.lbToKg = lb => lb / 2.20462

Recette.kgToLbOz = kg => {
  var lb
  lb = Recette.kgToLb(kg)
  return {
    lb: Math.floor(lb),
    oz: (lb - Math.floor(lb)) * 16.0
  }
}

Recette.lbOzToKg = (lb, oz) => Recette.lbToKg(lb + (oz / 16.0))

Recette.litersToGallons = liters => liters * 0.264172

Recette.gallonsToLiters = gallons => gallons / 0.264172

Recette.litersPerKgToQuartsPerLb = litersPerKg => litersPerKg * 0.479305709

Recette.quartsPerLbToLitersPerKg = quartsPerLb => quartsPerLb / 0.479305709

Recette.cToF = celcius => celcius * 1.8 + 32

Recette.fToC = fahrenheit => (fahrenheit - 32) / 1.8

Recette.yieldToPpg = yieldPercentage => yieldPercentage * 0.46214

Recette.ppgToYield = ppg => ppg * 2.16385

/*
Color functions --------------------------------------------------------------
 */

Recette.srmToEbc = srm => srm * 1.97

Recette.ebcToSrm = ebc => ebc * 0.508

Recette.srmToLovibond = srm => (srm + 0.76) / 1.3546

Recette.lovibondToSrm = lovibond => 1.3546 * lovibond - 0.76

Recette.srmToRgb = srm => {
  var b
  var g
  var r
  r = Math.round(Math.min(255, Math.max(0, 255 * (0.975 ** srm))))
  g = Math.round(Math.min(255, Math.max(0, 245 * (0.88 ** srm))))
  b = Math.round(Math.min(255, Math.max(0, 220 * (0.7 ** srm))))
  return [ r, g, b ]
}

Recette.srmToCss = srm => {
  var b
  var g
  var r
  var ref

  ref = Recette.srmToRgb(srm)
  r = ref[ 0 ]
  g = ref[ 1 ]
  b = ref[ 2 ]

  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

Recette.srmToName = srm => {
  var color
  var item
  var j
  var len
  var ref
  color = Recette.COLOR_NAMES[ 0 ][ 1 ]
  ref = Recette.COLOR_NAMES
  for (j = 0, len = ref.length; j < len; j++) {
    item = ref[ j ]
    if (item[ 0 ] <= srm) {
      color = item[ 1 ]
    }
  }
  return color
}

/*
Other Utilities --------------------------------------------------------------
 */

Recette.timeToHeat = (liters, degrees) => {
  var kj
  var minutes
  if (degrees == null) {
    degrees = 80
  }
  kj = 4.19 * liters * degrees
  minutes = kj / Recette.BURNER_ENERGY * 60
  return minutes
}

/*
Base objects -----------------------------------------------------------------
 */

Recette.OptionConstructor = ((() => {
  OptionConstructor.prototype._paramMap = {}

  function OptionConstructor (options) {
    var item
    var keys
    var property
    if (typeof options === 'string') {
      options = JSON.parse(options)
    }
    keys = Object.keys(this._paramMap)
    for (property in options) {
      if (!hasProp.call(options, property)) continue
      if (indexOf.call(keys, property) >= 0) {
        if (options[ property ] === null) {
          continue
        }
        if (options[ property ] instanceof Array) {
          this[ property ] = (function () {
            var j
            var len
            var ref
            var results
            ref = options[ property ]
            results = []
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[ j ]
              if (item instanceof this._paramMap[ property ]) {
                results.push(item)
              } else {
                results.push(new this._paramMap[ property ](item))
              }
            }
            return results
          }.call(this))
        } else {
          if (options[ property ] instanceof this._paramMap[ property ]) {
            this[ property ] = options[ property ]
          } else {
            this[ property ] = new this._paramMap[ property ](options[ property ])
          }
        }
      } else {
        this[ property ] = options[ property ]
      }
    }
  }

  return OptionConstructor
}))()

/*
Base class for new recipe ingredients. Each ingredient gets a name,
which defaults to 'New ' + the class name. For classes that inherit
Ingredient it will use their name, e.g:
 */

Recette.Ingredient = ((superClass => {
  extend(Ingredient, superClass)

  function Ingredient (options) {
    this.name = 'New ' + this.constructor.name
    Ingredient.__super__.constructor.call(this, options)
  }

  Ingredient.prototype.nameRegex = function (regex) {
    var item
    var j
    var len
    var result
    result = false
    if (typeof regex === 'string') {
      result = regex.exec(this.name)
    } else {
      for (j = 0, len = regex.length; j < len; j++) {
        item = regex[ j ]
        if (Array.isArray(item) && item.length === 2) {
          if (item[ 0 ].exec(this.name)) {
            result = item[ 1 ]
            break
          }
        } else if (typeof item === 'string') {
          result = item.exec(this.name)
        } else {
          throw new Error('Invalid regex input!')
        }
      }
    }
    return result
  }

  return Ingredient
}))(Recette.OptionConstructor)

/*
A fermentable ingredient, e.g. liquid malt extract. Each ingredient
has a name, weight in kilograms, yield as a percentage, color in
degrees SRM, and is marked as either late or normal. Late additions
affect hop utilization. Each fermentable also provides methods for
getting the type, addition, color name, and gravity units per volume
of liquid.
 */

Recette.Fermentable = ((superClass => {
  extend(Fermentable, superClass)

  function Fermentable (...args) {
    return Fermentable.__super__.constructor.apply(this, args)
  }

  Fermentable.STEEP = /biscuit|black|cara|chocolate|crystal|munich|roast|special ?b|toast|victory|vienna/i

  Fermentable.BOIL = /candi|candy|dme|dry|extract|honey|lme|liquid|sugar|syrup|turbinado/i

  Fermentable.prototype.weight = 1.0

  Fermentable.prototype.yield = 75.0

  Fermentable.prototype.color = 2.0

  Fermentable.prototype.late = false

  Fermentable.prototype.toJSON = function () {
    var json = {
      name: this.name,
      weight: this.weight,
      yield: this.yield,
      color: this.color,
      late: this.late
    }
    return json
  }

  Fermentable.prototype.type = function () {
    return this.nameRegex([
      [ Recette.Fermentable.BOIL, 'extract' ],
      [ /.*/, 'grain' ]
    ])
  }

  Fermentable.prototype.addition = function () {
    return this.nameRegex([
      [ /mash/i, 'mash' ],
      [ /steep/i, 'steep' ],
      [ /boil/i, 'boil' ],
      [ Recette.Fermentable.BOIL, 'boil' ],
      [ Recette.Fermentable.STEEP, 'steep' ],
      [ /.*/, 'mash' ]
    ])
  }

  Fermentable.prototype.weightLb = function () {
    return Recette.kgToLb(this.weight)
  }

  Fermentable.prototype.weightLbOz = function () {
    return Recette.kgToLbOz(this.weight)
  }

  Fermentable.prototype.ppg = function () {
    return Recette.yieldToPpg(this.yield)
  }

  Fermentable.prototype.plato = function (liters) {
    if (liters == null) {
      liters = 1.0
    }
    return 259 - (259 / (1.0 + this.gu(liters) / 1000))
  }

  Fermentable.prototype.gu = function (liters) {
    if (liters == null) {
      liters = 1.0
    }
    return this.ppg() * this.weightLb() / Recette.litersToGallons(liters)
  }

  Fermentable.prototype.colorRgb = function () {
    return Recette.srmToRgb(this.color)
  }

  Fermentable.prototype.colorCss = function () {
    return Recette.srmToCss(this.color)
  }

  Fermentable.prototype.colorName = function () {
    return Recette.srmToName(this.color)
  }

  Fermentable.prototype.price = function () {
    var pricePerKg
    pricePerKg = this.nameRegex([
      [ /dry|dme/i, 8.80 ],
      [ /liquid|lme/i, 6.60 ],
      [ /.*/i, 4.40 ]
    ])
    return this.weight * pricePerKg
  }

  return Fermentable
}))(Recette.Ingredient)

/*
A spice ingredient, e.g. cascade hops or crushed coriander. Each spice
has a weight in kilograms, alpha acid (aa) percentage, use (mash, boil,
primary, secondary, etc), time in minutes to add the spice, and the
spice's form (whole, leaf, pellet, crushed, ground, etc).
 */

Recette.Spice = ((superClass => {
  extend(Spice, superClass)

  function Spice (...args) {
    return Spice.__super__.constructor.apply(this, args)
  }

  Spice.DRY_SPICE = /primary|secondary|dry/i

  Spice.prototype.weight = 0.025

  Spice.prototype.aa = 0.0

  Spice.prototype.use = 'boil'

  Spice.prototype.time = 60

  Spice.prototype.form = 'pellet'

  Spice.prototype.toJSON = function () {
    var json = {
      name: this.name,
      weight: this.weight,
      aa: this.aa,
      use: this.use,
      time: this.time,
      form: this.form
    }
    return json
  }

  Spice.prototype.dry = function () {
    return Recette.Spice.DRY_SPICE.exec(this.use) || false
  }

  Spice.prototype.utilizationFactor = function () {
    if (this.form === 'pellet') {
      return 1.15
    } else {
      return 1.0
    }
  }

  Spice.prototype.bitterness = function (ibuMethod, earlyOg, batchSize) {
    var adjustment
    var bitterness
    var utilization
    if (ibuMethod === 'tinseth') {
      bitterness = 1.65 * (0.000125 ** (earlyOg - 1.0)) * ((1 - Math.E ** (-0.04 * this.time)) / 4.15) * ((this.aa / 100.0 * this.weight * 1000000) / batchSize) * this.utilizationFactor()
    } else if (ibuMethod === 'rager') {
      utilization = 18.11 + 13.86 * tanh((this.time - 31.32) / 18.27)
      adjustment = Math.max(0, (earlyOg - 1.050) / 0.2)
      bitterness = this.weight * 100 * utilization * this.utilizationFactor() * this.aa / (batchSize * (1 + adjustment))
    } else {
      throw new Error("Unknown IBU method '" + ibuMethod + "'!")
    }
    return bitterness
  }

  Spice.prototype.weightLb = function () {
    return Recette.kgToLb(this.weight)
  }

  Spice.prototype.weightLbOz = function () {
    return Recette.kgToLbOz(this.weight)
  }

  Spice.prototype.price = function () {
    var pricePerKg
    pricePerKg = this.nameRegex([
      [ /.*/i, 17.64 ]
    ])
    return this.weight * pricePerKg
  }

  return Spice
}))(Recette.Ingredient)

/*
A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
type (ale, lager, other), a form (liquid, dry), and an attenuation
percentage that describes the maximum attenuation under ideal
conditions.
 */

Recette.Yeast = ((superClass => {
  extend(Yeast, superClass)

  function Yeast (...args) {
    return Yeast.__super__.constructor.apply(this, args)
  }

  Yeast.prototype.type = 'ale'

  Yeast.prototype.form = 'liquid'

  Yeast.prototype.attenuation = 75.0

  Yeast.prototype.toJSON = function () {
    var json = {
      name: this.name,
      type: this.type,
      form: this.form,
      attenuation: this.attenuation
    }
    return json
  }

  Yeast.prototype.price = function () {
    return this.nameRegex([
      [ /wyeast|white labs|wlp/i, 7.00 ],
      [ /.*/i, 3.50 ]
    ])
  }

  return Yeast
}))(Recette.Ingredient)

/*
A mash step, which contains information about a specific step during the mash
process, such as the amount of water to add, temperature to raise or lower
the mash to, etc.
 */

Recette.MashStep = ((superClass => {
  extend(MashStep, superClass)

  function MashStep (...args) {
    return MashStep.__super__.constructor.apply(this, args)
  }

  MashStep.types = [ 'Infusion', 'Temperature', 'Decoction' ]

  MashStep.prototype.name = 'Saccharification'

  MashStep.prototype.type = 'Infusion'

  MashStep.prototype.waterRatio = 3.0

  MashStep.prototype.temp = 68.0

  MashStep.prototype.endTemp = null

  MashStep.prototype.time = 60

  MashStep.prototype.rampTime = null

  MashStep.prototype.toJSON = function () {
    var json = {
      name: this.name,
      type: this.type,
      waterRatio: this.waterRatio,
      temp: this.temp,
      endTemp: this.endTemp,
      time: this.time,
      rampTime: this.rampTime
    }
    return json
  }

  MashStep.prototype.description = function (siUnits, totalGrainWeight) {
    var absoluteUnits
    var desc
    var relativeUnits
    var temp
    var waterAmount
    var waterRatio
    if (siUnits == null) {
      siUnits = true
    }
    desc = ''
    if (siUnits) {
      absoluteUnits = 'l'
      relativeUnits = 'l per kg'
      temp = this.temp + 'C'
      waterRatio = this.waterRatio
    } else {
      absoluteUnits = 'qt'
      relativeUnits = 'qt per lb'
      temp = (this.tempF()) + 'F'
      waterRatio = this.waterRatioQtPerLb()
    }
    if (totalGrainWeight != null) {
      if (!siUnits) {
        totalGrainWeight = Recette.kgToLb(totalGrainWeight)
      }
      waterAmount = '' + ((waterRatio * totalGrainWeight).toFixed(1)) + absoluteUnits
    } else {
      waterAmount = '' + (waterRatio.toFixed(1)) + relativeUnits + ' of grain'
    }
    switch (this.type) {
      case 'Infusion':
        desc = 'Infuse ' + waterAmount + ' for ' + this.time + ' minutes at ' + temp
        break
      case 'Temperature':
        desc = 'Stop heating and hold for ' + this.time + ' minutes at ' + temp
        break
      case 'Decoction':
        desc = 'Add ' + waterAmount + ' boiled water to reach ' + temp + ' and hold for ' + this.time + ' minutes'
        break
      default:
        desc = "Unknown mash step type '" + this.type + "'!"
    }
    return desc
  }

  MashStep.prototype.waterRatioQtPerLb = function () {
    return Recette.litersPerKgToQuartsPerLb(this.waterRatio)
  }

  MashStep.prototype.tempF = function () {
    return Recette.cToF(this.temp)
  }

  MashStep.prototype.endTempF = function () {
    return Recette.cToF(this.endTemp)
  }

  return MashStep
}))(Recette.OptionConstructor)

/*
A mash profile, which contains information about a mash along with a list
of steps to be taken.
 */

Recette.Mash = ((superClass => {
  extend(Mash, superClass)

  Mash.prototype._paramMap = {
    steps: Recette.MashStep
  }

  function Mash (options) {
    this.steps = []
    Mash.__super__.constructor.call(this, options)
  }

  Mash.prototype.name = ''

  Mash.prototype.grainTemp = Recette.ROOM_TEMP

  Mash.prototype.spargeTemp = 76

  Mash.prototype.ph = null

  Mash.prototype.notes = ''

  Mash.prototype.steps = null

  Mash.prototype.toJSON = function () {
    var json = {
      name: this.name,
      grainTemp: this.grainTemp,
      spargeTemp: this.spargeTemp,
      ph: this.ph,
      notes: this.notes,
      steps: this.steps
    }
    return json
  }

  Mash.prototype.grainTempF = function () {
    return Recette.cToF(this.grainTemp)
  }

  Mash.prototype.spargeTempF = function () {
    return Recette.cToF(this.spargeTemp)
  }

  Mash.prototype.addStep = function (options) {
    return this.steps.push(new Recette.MashStep(options))
  }

  return Mash
}))(Recette.OptionConstructor)

/*
A beer recipe, consisting of various ingredients and metadata which
provides a calculate() method to calculate OG, FG, IBU, ABV, and a
timeline of instructions for brewing the recipe.
 */

Recette.Recipe = ((superClass => {
  extend(Recipe, superClass)

  Recipe.prototype.name = 'New Recipe'

  Recipe.prototype.description = 'Recipe description'

  Recipe.prototype.author = 'Anonymous Brewer'

  Recipe.prototype.boilSize = 10.0

  Recipe.prototype.batchSize = 20.0

  Recipe.prototype.servingSize = 0.355

  Recipe.prototype.steepEfficiency = 50

  Recipe.prototype.steepTime = 20

  Recipe.prototype.mashEfficiency = 75

  Recipe.prototype.style = null

  Recipe.prototype.ibuMethod = 'tinseth'

  Recipe.prototype.fermentables = null

  Recipe.prototype.spices = null

  Recipe.prototype.yeast = null

  Recipe.prototype.mash = null

  Recipe.prototype.og = 0.0

  Recipe.prototype.fg = 0.0

  Recipe.prototype.color = 0.0

  Recipe.prototype.ibu = 0.0

  Recipe.prototype.abv = 0.0

  Recipe.prototype.price = 0.0

  Recipe.prototype.buToGu = 0.0

  Recipe.prototype.bv = 0.0

  Recipe.prototype.ogPlato = 0.0

  Recipe.prototype.fgPlato = 0.0

  Recipe.prototype.abw = 0.0

  Recipe.prototype.realExtract = 0.0

  Recipe.prototype.calories = 0.0

  Recipe.prototype.bottlingTemp = 0.0

  Recipe.prototype.bottlingPressure = 0.0

  Recipe.prototype.primingCornSugar = 0.0

  Recipe.prototype.primingSugar = 0.0

  Recipe.prototype.primingHoney = 0.0

  Recipe.prototype.primingDme = 0.0

  Recipe.prototype.primaryDays = 14.0

  Recipe.prototype.primaryTemp = 20.0

  Recipe.prototype.secondaryDays = 0.0

  Recipe.prototype.secondaryTemp = 0.0

  Recipe.prototype.tertiaryDays = 0.0

  Recipe.prototype.tertiaryTemp = 0.0

  Recipe.prototype.agingDays = 14

  Recipe.prototype.agingTemp = 20.0

  Recipe.prototype.brewDayDuration = null

  Recipe.prototype.boilStartTime = null

  Recipe.prototype.boilEndTime = null

  Recipe.prototype.timelineMap = null

  Recipe.prototype._paramMap = {
    fermentables: Recette.Fermentable,
    spices: Recette.Spice,
    yeast: Recette.Yeast,
    mash: Recette.Mash
  }

  function Recipe (options) {
    this.fermentables = []
    this.spices = []
    this.yeast = []
    Recipe.__super__.constructor.call(this, options)
  }

  Recipe.prototype.toJSON = function () {
    var json = {
      name: this.name,
      description: this.description,
      author: this.author,
      boilSize: this.boilSize,
      batchSize: this.batchSize,
      servingSize: this.servingSize,
      steepEfficiency: this.steepEfficiency,
      steepTime: this.steepTime,
      mashEfficiency: this.mashEfficiency,
      style: this.style,
      ibuMethod: this.ibuMethod,
      fermentables: this.fermentables,
      spices: this.spices,
      yeast: this.yeast,
      mash: this.mash,
      bottlingTemp: this.bottlingTemp,
      bottlingPressure: this.bottlingPressure,
      primaryDays: this.primaryDays,
      primaryTemp: this.primaryTemp,
      secondaryDays: this.secondaryDays,
      secondaryTemp: this.secondaryTemp,
      tertiaryDays: this.tertiaryDays,
      tertiaryTemp: this.tertiaryTemp,
      agingDays: this.agingDays,
      agingTemp: this.agingTemp
    }
    return json
  }

  Recipe.prototype.batchSizeGallons = function () {
    return Recette.litersToGallons(this.batchSize)
  }

  Recipe.prototype.boilSizeGallons = function () {
    return Recette.litersToGallons(this.boilSize)
  }

  Recipe.prototype.add = function (type, values) {
    switch (type) {
      case 'fermentable':
        return this.fermentables.push(new Recette.Fermentable(values))
      case 'spice':
      case 'hop':
        return this.spices.push(new Recette.Spice(values))
      case 'yeast':
        return this.yeast.push(new Recette.Yeast(values))
    }
  }

  Recipe.prototype.grainWeight = function () {
    var fermentable
    var j
    var len
    var ref
    var weight
    weight = 0.0
    ref = this.fermentables
    for (j = 0, len = ref.length; j < len; j++) {
      fermentable = ref[ j ]
      if (fermentable.type() === 'grain') {
        weight += fermentable.weight
      }
    }
    return weight
  }

  Recipe.prototype.bottleCount = function () {
    return Math.floor(this.batchSize / this.servingSize)
  }

  Recipe.prototype.colorName = function () {
    return Recette.srmToName(this.color)
  }

  Recipe.prototype.scale = function (batchSize, boilSize) {
    var adjustment
    var bitterness
    var earlyOg
    var efficiency
    var fermentable
    var j
    var k
    var len
    var len1
    var newEarlyOg
    var ref
    var ref1
    var spice
    var utilization
    earlyOg = 1.0
    newEarlyOg = 1.0
    ref = this.fermentables
    for (j = 0, len = ref.length; j < len; j++) {
      fermentable = ref[ j ]
      efficiency = (function () {
        switch (fermentable.addition()) {
          case 'steep':
            return this.steepEfficiency / 100.0
          case 'mash':
            return this.mashEfficiency / 100.0
          default:
            return 1.0
        }
      }.call(this))
      if (!fermentable.late) {
        earlyOg += fermentable.gu(this.boilSize) * efficiency / 1000.0
      }
      fermentable.weight *= batchSize / this.batchSize
      if (!fermentable.late) {
        newEarlyOg += fermentable.gu(boilSize) * efficiency / 1000.0
      }
    }
    ref1 = this.spices
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      spice = ref1[ k ]
      if (spice.aa && spice.time) {
        bitterness = spice.bitterness(this.ibuMethod, earlyOg, this.batchSize)
        switch (this.ibuMethod) {
          case 'tinseth':
            spice.weight = (bitterness * batchSize) / (1.65 * (0.000125 ** (newEarlyOg - 1.0)) * ((1 - 2.718 ** (-0.04 * spice.time)) / 4.15) * (spice.aa / 100 * 1000000) * spice.utilizationFactor())
            break
          case 'rager':
            utilization = 18.11 + 13.86 * tanh((spice.time - 31.32) / 18.27)
            adjustment = Math.max(0, (newEarlyOg - 1.050) / 0.2)
            spice.weight = bitterness / (100 * utilization * spice.utilizationFactor() * spice.aa / (batchSize * (1 + adjustment)))
        }
      } else {
        spice.weight *= batchSize / this.batchSize
      }
    }
    this.batchSize = batchSize
    this.boilSize = boilSize
    return this.boilSize
  }

  Recipe.prototype.grade = function () {
    var filterFunc
    var grade
    var ingredients
    var j
    var len
    var ref
    var ref1
    var ref2
    var ref3
    grade = 0.0
    if ((ref = this.name.toLowerCase()) !== '' && ref !== 'new recipe' && ref !== 'untitled') {
      grade += 1.0
    }
    if ((ref1 = this.description.toLowerCase()) !== '' && ref1 !== 'recipe description') {
      grade += 1.0
    }
    if ((ref2 = this.author.toLowerCase()) !== '' && ref2 !== 'anonymous brewer') {
      grade += 1.0
    }
    if (this.style) {
      grade += 0.5
    }
    ref3 = [ this.fermentables, this.spices, this.yeast ]
    for (j = 0, len = ref3.length; j < len; j++) {
      ingredients = ref3[ j ]
      if (ingredients.length) {
        grade += 1.0
        filterFunc = x => {
          var ref4
          return (ref4 = x.name.toLowerCase()) === '' || ref4 === 'new fermentable' || ref4 === 'new spice' || ref4 === 'new yeast'
        }
        if (!ingredients.filter(filterFunc).length) {
          grade += 0.5
        }
      }
    }
    return grade
  }

  Recipe.prototype.calculate = function () {
    var attenuation
    var base
    var base1
    var bitterness
    var earlyOg
    var efficiency
    var fermentable
    var gravity
    var gu
    var j
    var k
    var l
    var len
    var len1
    var len2
    var mcu
    var ref
    var ref1
    var ref2
    var rte
    var spice
    var t
    var time
    var v
    var yeast
    this.og = 1.0
    this.fg = 0.0
    this.ibu = 0.0
    this.price = 0.0
    earlyOg = 1.0
    mcu = 0.0
    attenuation = 0.0
    this.timelineMap = {
      fermentables: {
        mash: [],
        steep: [],
        boil: [],
        boilEnd: []
      },
      times: {},
      drySpice: {},
      yeast: []
    }
    ref = this.fermentables
    for (j = 0, len = ref.length; j < len; j++) {
      fermentable = ref[ j ]
      efficiency = (function () {
        switch (fermentable.addition()) {
          case 'steep':
            return this.steepEfficiency / 100.0
          case 'mash':
            return this.mashEfficiency / 100.0
          default:
            return 1.0
        }
      }.call(this))
      mcu += fermentable.color * fermentable.weightLb() / this.batchSizeGallons()
      gu = fermentable.gu(this.batchSize) * efficiency
      gravity = gu / 1000.0
      this.og += gravity
      if (!fermentable.late) {
        earlyOg += fermentable.gu(this.boilSize) * efficiency / 1000.0
      }
      this.price += fermentable.price()
      switch (fermentable.addition()) {
        case 'boil':
          if (!fermentable.late) {
            this.timelineMap.fermentables.boil.push([ fermentable, gu ])
          } else {
            this.timelineMap.fermentables.boilEnd.push([ fermentable, gu ])
          }
          break
        case 'steep':
          this.timelineMap.fermentables.steep.push([ fermentable, gu ])
          break
        case 'mash':
          this.timelineMap.fermentables.mash.push([ fermentable, gu ])
      }
    }
    this.color = 1.4922 * (mcu ** 0.6859)
    ref1 = this.yeast
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      yeast = ref1[ k ]
      if (yeast.attenuation > attenuation) {
        attenuation = yeast.attenuation
      }
      this.price += yeast.price()
      this.timelineMap.yeast.push(yeast)
    }
    if (attenuation === 0) {
      attenuation = 75.0
    }
    this.fg = this.og - ((this.og - 1.0) * attenuation / 100.0)
    this.abv = ((1.05 * (this.og - this.fg)) / this.fg) / 0.79 * 100.0
    this.ogPlato = (-463.37) + (668.72 * this.og) - (205.35 * (this.og * this.og))
    this.fgPlato = (-463.37) + (668.72 * this.fg) - (205.35 * (this.fg * this.fg))
    this.realExtract = (0.1808 * this.ogPlato) + (0.8192 * this.fgPlato)
    this.abw = 0.79 * this.abv / this.fg
    this.calories = Math.max(0, ((6.9 * this.abw) + 4.0 * (this.realExtract - 0.10)) * this.fg * this.servingSize * 10)
    v = this.bottlingPressure || 2.5
    t = Recette.cToF(this.bottlingTemp || Recette.ROOM_TEMP)
    this.primingCornSugar = 0.015195 * 5 * (v - 3.0378 + (0.050062 * t) - (0.00026555 * t * t))
    this.primingSugar = this.primingCornSugar * 0.90995
    this.primingHoney = this.primingCornSugar * 1.22496
    this.primingDme = this.primingCornSugar * 1.33249
    ref2 = this.spices
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      spice = ref2[ l ]
      bitterness = 0.0
      time = spice.time
      if (spice.aa && spice.use.toLowerCase() === 'boil') {
        this.ibu += spice.bitterness(this.ibuMethod, earlyOg, this.batchSize)
      }
      this.price += spice.price()
      if (spice.dry()) {
        if ((base = this.timelineMap[ 'drySpice' ])[ time ] == null) {
          base[ time ] = []
        }
        this.timelineMap[ 'drySpice' ][ time ].push([ spice, bitterness ])
      } else {
        if ((base1 = this.timelineMap[ 'times' ])[ time ] == null) {
          base1[ time ] = []
        }
        this.timelineMap[ 'times' ][ time ].push([ spice, bitterness ])
      }
    }
    this.buToGu = this.ibu / (this.og - 1.000) / 1000.0
    rte = (0.82 * (this.fg - 1.000) + 0.18 * (this.og - 1.000)) * 1000.0
    this.bv = 0.8 * this.ibu / rte
    return this.bv
  }

  Recipe.prototype.timeline = function (siUnits) {
    var action
    var ageTemp
    var boilName
    var boilTime
    var boilVolume
    var chillTemp
    var currentTemp
    var fermentable
    var fermentableList
    // var gravity
    var heatTemp
    var i
    var ingredients
    var j
    var k
    var key
    var len
    var len1
    var liquidVolume
    var mash
    var previousSpiceTime
    var primeMsg
    var ref
    var ref1
    var spiceList
    var steepHeatTime
    var steepTemp
    var steepVolume
    var steepWeight
    var step
    var steps
    var strikeTemp
    var strikeTempDesc
    var strikeVolume
    var strikeVolumeDesc
    var time
    var timeToHeat
    var timeline
    var times
    var totalTime
    // var value
    var waterChangeRatio
    var yeast
    var yeasts
    if (siUnits == null) {
      siUnits = true
    }
    timeline = []
    boilName = 'water'
    totalTime = 0
    currentTemp = Recette.ROOM_TEMP
    liquidVolume = 0
    fermentableList = items => {
      var fermentable
      var gravity
      var ingredients
      var j
      var lboz
      var len
      var ref
      var ref1
      var weight
      ingredients = []
      ref = items || []
      for (j = 0, len = ref.length; j < len; j++) {
        ref1 = ref[ j ]
        fermentable = ref1[ 0 ]
        gravity = ref1[ 1 ]
        if (siUnits) {
          weight = (fermentable.weight.toFixed(1)) + 'kg'
        } else {
          lboz = fermentable.weightLbOz()
          weight = (parseInt(lboz.lb)) + 'lb ' + (parseInt(lboz.oz)) + 'oz'
        }
        ingredients.push(weight + ' of ' + fermentable.name + ' (' + (gravity.toFixed(1)) + ' GU)')
      }
      return ingredients
    }
    spiceList = items => {
      var extra
      var ibu
      var ingredients
      var j
      var len
      var ref
      var ref1
      var spice
      var weight
      ingredients = []
      ref = items || []
      for (j = 0, len = ref.length; j < len; j++) {
        ref1 = ref[ j ]
        spice = ref1[ 0 ]
        ibu = ref1[ 1 ]
        if (siUnits) {
          weight = (parseInt(spice.weight * 1000)) + 'g'
        } else {
          weight = ((spice.weightLb() * 16.0).toFixed(2)) + 'oz'
        }
        extra = ''
        if (ibu) {
          extra = ' (' + (ibu.toFixed(1)) + ' IBU)'
        }
        ingredients.push(weight + ' of ' + spice.name + extra)
      }
      return ingredients
    }
    if (this.timelineMap.fermentables.mash.length) {
      boilName = 'wort'
      mash = this.mash
      if (mash == null) {
        mash = new Recette.Mash()
      }
      ingredients = fermentableList(this.timelineMap.fermentables.mash)
      timeline.push([ totalTime, 'Begin ' + mash.name + ' mash. Add ' + (ingredients.join(', ')) + '.' ])
      steps = ((ref = this.mash) != null ? ref.steps : void 0) || [
        new Recette.MashStep({
          name: 'Saccharification',
          type: 'Infusion',
          time: 60,
          rampTime: Recette.timeToHeat(this.grainWeight(), 68 - currentTemp),
          temp: 68,
          waterRatio: 2.75
        })
      ]
      for (j = 0, len = steps.length; j < len; j++) {
        step = steps[ j ]
        strikeVolume = (step.waterRatio * this.grainWeight()) - liquidVolume
        if (step.temp !== currentTemp && strikeVolume > 0) {
          strikeTemp = ((step.temp - currentTemp) * (0.4184 * this.grainWeight()) / strikeVolume) + step.temp
          timeToHeat = Recette.timeToHeat(strikeVolume, strikeTemp - currentTemp)
          if (siUnits) {
            strikeVolumeDesc = (strikeVolume.toFixed(1)) + 'l'
            strikeTempDesc = (Math.round(strikeTemp)) + '°C'
          } else {
            strikeVolumeDesc = ((Recette.litersToGallons(strikeVolume) * 4).toFixed(1)) + 'qts'
            strikeTempDesc = (Math.round(Recette.cToF(strikeTemp))) + '°F'
          }
          timeline.push([ totalTime, 'Heat ' + strikeVolumeDesc + ' to ' + strikeTempDesc + ' (about ' + (Math.round(timeToHeat)) + ' minutes)' ])
          liquidVolume += strikeVolume
          totalTime += timeToHeat
        } else if (step.temp !== currentTemp) {
          timeToHeat = Recette.timeToHeat(liquidVolume, step.temp - currentTemp)
          if (siUnits) {
            heatTemp = (Math.round(step.temp)) + '°C'
          } else {
            heatTemp = (Math.round(Recette.cToF(step.temp))) + '°F'
          }
          timeline.push([ totalTime, 'Heat the mash to ' + heatTemp + ' (about ' + (Math.round(timeToHeat)) + ' minutes)' ])
          totalTime += timeToHeat
        }
        timeline.push([ totalTime, step.name + ': ' + (step.description(siUnits, this.grainWeight())) + '.' ])
        totalTime += step.time
        currentTemp = step.temp - (step.time * Recette.MASH_HEAT_LOSS / 60.0)
      }
      timeline.push([ totalTime, 'Remove grains from mash. This is now your wort.' ])
      totalTime += 5
    }
    if (this.timelineMap.fermentables.steep.length) {
      boilName = 'wort'
      steepWeight = (function () {
        var k
        var len1
        var ref1
        var ref2
        var results
        ref1 = this.timelineMap.fermentables.steep
        results = []
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          ref2 = ref1[ k ]
          fermentable = ref2[ 0 ]
          // gravity = ref2[1]
          results.push(fermentable.weight)
        }
        return results
      }.call(this)).reduce((x, y) => x + y)
      steepHeatTime = Recette.timeToHeat(steepWeight * 2.75, 68 - currentTemp)
      currentTemp = 68
      liquidVolume += steepWeight * 2.75
      if (siUnits) {
        steepVolume = ((steepWeight * 2.75).toFixed(1)) + 'l'
        steepTemp = 68 + '°C'
      } else {
        steepVolume = (Recette.litersToGallons(steepWeight * 2.75).toFixed(1)) + 'gal'
        steepTemp = (Recette.cToF(68).toFixed(1)) + '°F'
      }
      timeline.push([ totalTime, 'Heat ' + steepVolume + ' to ' + steepTemp + ' (about ' + (Math.round(steepHeatTime)) + ' minutes)' ])
      totalTime += steepHeatTime
      ingredients = fermentableList(this.timelineMap.fermentables.steep)
      timeline.push([ totalTime, 'Add ' + (ingredients.join(', ')) + ' and steep for ' + this.steepTime + ' minutes.' ])
      totalTime += 20
    }
    waterChangeRatio = Math.min(1, liquidVolume / this.boilSize)
    currentTemp = (currentTemp * waterChangeRatio) + (Recette.ROOM_TEMP * (1.0 - waterChangeRatio))
    if (siUnits) {
      boilVolume = (this.boilSize.toFixed(1)) + 'l'
    } else {
      boilVolume = (this.boilSizeGallons().toFixed(1)) + 'gal'
    }
    if (this.boilSize - liquidVolume < this.boilSize) {
      action = 'Top up the ' + boilName + ' to ' + boilVolume + ' and heat to a rolling boil'
    } else {
      action = 'Bring ' + boilVolume + ' to a rolling boil'
    }
    boilTime = parseInt(Recette.timeToHeat(this.boilSize, 100 - currentTemp))
    timeline.push([ totalTime, action + ' (about ' + boilTime + ' minutes).' ])
    totalTime += boilTime
    this.boilStartTime = totalTime
    times = (function () {
      var ref1
      var results
      ref1 = this.timelineMap.times
      results = []
      for (key in ref1) {
        if (!hasProp.call(ref1, key)) continue
        // value = ref1[key]
        results.push(parseInt(key))
      }
      return results
    }.call(this))
    if (this.timelineMap.fermentables.boilEnd.length && indexOf.call(times, 5) < 0) {
      this.timelineMap.times[ 5 ] = []
      times.push(5)
    }
    previousSpiceTime = 0
    ref1 = times.sort((x, y) => y - x)
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      time = ref1[ i ]
      ingredients = spiceList(this.timelineMap.times[ time ])
      if (i === 0) {
        ingredients = fermentableList(this.timelineMap.fermentables.boil).concat(ingredients)
        previousSpiceTime = time
      }
      totalTime += previousSpiceTime - time
      previousSpiceTime = time
      if (time === 5 && this.timelineMap.fermentables.boilEnd.length) {
        ingredients = fermentableList(this.timelineMap.fermentables.boilEnd).concat(ingredients)
      }
      timeline.push([ totalTime, 'Add ' + (ingredients.join(', ')) ])
    }
    totalTime += previousSpiceTime
    this.boilEndTime = totalTime
    if (siUnits) {
      chillTemp = this.primaryTemp + '°C'
    } else {
      chillTemp = (Recette.cToF(this.primaryTemp)) + '°F'
    }
    timeline.push([ totalTime, 'Flame out. Begin chilling to ' + chillTemp + ' and aerate the cooled wort (about 20 minutes).' ])
    totalTime += 20
    yeasts = (function () {
      var l
      var len2
      var ref2
      var results
      ref2 = this.yeast
      results = []
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        yeast = ref2[ l ]
        results.push(yeast.name)
      }
      return results
    }.call(this))
    if (!yeasts.length && this.primaryDays) {
      yeasts = [ 'yeast' ]
    }
    if (yeasts.length) {
      timeline.push([ totalTime, 'Pitch ' + (yeasts.join(', ')) + ' and seal the fermenter. You should see bubbles in the airlock within 24 hours.' ])
    }
    this.brewDayDuration = totalTime
    if (!this.primaryDays && !this.secondaryDays && !this.tertiaryDays) {
      timeline.push([ totalTime, 'Drink immediately (about ' + (this.bottleCount()) + ' bottles).' ])
      return timeline
    }
    totalTime += this.primaryDays * 1440
    if (this.secondaryDays) {
      timeline.push([ totalTime, 'Move to secondary fermenter for ' + (Recette.displayDuration(this.secondaryDays * 1440, 2)) + '.' ])
      totalTime += this.secondaryDays * 1440
    } else if (this.tertiaryDays) {
      timeline.push([ totalTime, 'Move to tertiary fermenter for ' + (Recette.displayDuration(this.tertiaryDays * 1440, 2)) + '.' ])
      totalTime += this.tertiaryDays * 1440
    }
    primeMsg = 'Prime and bottle about ' + (this.bottleCount()) + ' bottles.'
    if (this.agingDays) {
      if (siUnits) {
        ageTemp = this.agingTemp + 'C'
      } else {
        ageTemp = (Recette.cToF(this.agingTemp)) + 'F'
      }
      primeMsg += ' Age at ' + ageTemp + ' for ' + this.agingDays + ' days.'
    }
    timeline.push([ totalTime, primeMsg ])
    totalTime += this.agingDays * 1440
    timeline.push([ totalTime, 'Relax, don\'t worry and have a homebrew!' ])
    return timeline
  }

  return Recipe
}))(Recette.OptionConstructor)
