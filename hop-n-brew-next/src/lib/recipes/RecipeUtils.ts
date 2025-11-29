import { UnitConverter } from '../UnitConverter'

/**
 * Classe utilitaire pour les calculs liés aux recettes de bière
 */
export class RecipeUtils {
  /**
   * Convertit une durée en minutes
   * @param value - Valeur de la durée (ex: "2h 30m", "120m", 150)
   */
  static parseDuration(value: string | number): number {
    let duration = 0
    
    if (typeof value === 'number') {
      return value
    }
    
    const weeks = value.match(/(\d+)\s*w/i)
    const days = value.match(/(\d+)\s*d/i)
    const hours = value.match(/(\d+)\s*h/i)
    const min = value.match(/(\d+)\s*m/i)
    const sec = value.match(/(\d+)\s*s/i)
    
    const factors = [
      [weeks, 7 * 60 * 24],
      [days, 60 * 24],
      [hours, 60],
      [min, 1],
      [sec, 1.0 / 60]
    ]
    
    for (const [unit, factor] of factors) {
      if (unit && Array.isArray(unit)) {
        duration += parseInt(unit[1]) * (factor as number)
      }
    }
    
    return duration
  }

 /**
   * Affiche une durée de manière lisible
   * @param minutes - Durée en minutes
   * @param approximate - Nombre d'unités à afficher (optionnel)
   */
  static displayDuration(minutes: number, approximate?: number): string {
    const durations: string[] = []
    const factors = [
      ['month', 30 * 60 * 24],
      ['week', 7 * 60 * 24],
      ['day', 60 * 24],
      ['hour', 60],
      ['minute', 1]
    ]
    
    let count = 0
    for (const [label, factor] of factors) {
      let amount: number
      const factorNum = factor as number
      if (factorNum === 1 || (approximate !== undefined && count === approximate - 1)) {
        amount = Math.round(minutes / factorNum)
      } else {
        amount = Math.floor(minutes / factorNum)
      }
      minutes = minutes % factorNum
      
      if (amount > 0 || count > 0) {
        count++
      }
      if (approximate !== undefined && count > approximate) {
        break
      }
      if (amount > 0) {
        const plural = amount !== 1 ? 's' : ''
        durations.push(`${amount} ${label}${plural}`)
      }
    }
    
    if (durations.length === 0) {
      return 'start'
    }
    
    return durations.join(' ')
  }

  /**
   * Arrondit un nombre à la précision spécifiée
   * @param nombre - Nombre à arrondir
   * @param precision - Précision (par défaut 2)
   */
  static roundDecimal(nombre: number, precision = 2): number {
    const tmp = Math.pow(10, precision)
    return Math.round(nombre * tmp) / tmp
  }

  /**
   * Convertit une valeur avec unité vers une autre unité
   * @param val - Valeur à convertir (ex: "5 kg", "2.5 L")
   * @param unit - Unité cible
   * @param dec - Nombre de décimales (par défaut 1)
   */
  static convertTo(val: string | number, unit: string, dec = 1): number {
    if (!val) return 0
    
    if (typeof val === 'string') {
      const ref = val.toLowerCase().split(' ')
      let ret: number | null = null
      
      if (ref.length === 3) {
        ref[1] = ref[1] + ' + ' + ref[2]
      }
      if (ref.length === 2 || ref.length === 3) {
        ret = UnitConverter.convertValue(parseFloat(ref[0]), ref[1], unit)
      } else if (ref.length === 4) {
        const val1 = UnitConverter.convertValue(parseFloat(ref[0]), ref[1], unit)
        const val2 = UnitConverter.convertValue(parseFloat(ref[2]), ref[3], unit)
        ret = (val1 ?? 0) + (val2 ?? 0)
      }
      
      return ret !== null ? RecipeUtils.roundDecimal(ret, dec) : 0
    } else {
      return RecipeUtils.roundDecimal(val, dec)
    }
  }

  /**
   * Convertit un volume vers une unité spécifique
   * @param displayVol - Volume à convertir
   * @param unit - Unité cible
   * @param dec - Nombre de décimales (par défaut 1)
   */
  static convertVolTo(displayVol: string, unit: string, dec = 1): number {
    return RecipeUtils.convertTo(displayVol.replace('oz', 'fl-oz'), unit.replace('oz', 'fl-oz'), dec)
  }

  /**
   * Convertit des kilogrammes en livres
   * @param kg - Poids en kilogrammes
   */
  static kgToLb(kg: number): number {
    return kg * 2.20462
  }

  /**
   * Convertit des kilogrammes en onces
   * @param kg - Poids en kilogrammes
   */
  static kgToOz(kg: number): number {
    return kg * 35.27396
 }

  /**
   * Convertit des livres en kilogrammes
   * @param lb - Poids en livres
   */
  static lbToKg(lb: number): number {
    return lb / 2.20462
  }

 /**
   * Convertit des kilogrammes en livres et onces
   * @param kg - Poids en kilogrammes
   */
  static kgToLbOz(kg: number): { lb: number; oz: number } {
    const lb = RecipeUtils.kgToLb(kg)
    return {
      lb: Math.floor(lb),
      oz: (lb - Math.floor(lb)) * 16.0
    }
  }

  /**
   * Convertit des livres et onces en kilogrammes
   * @param lb - Livres
   * @param oz - Ounces
   */
  static lbOzToKg(lb: number, oz: number): number {
    return RecipeUtils.lbToKg(lb + (oz / 16.0))
  }

  /**
   * Convertit des onces en kilogrammes
   * @param oz - Poids en onces
   */
  static ozToKg(oz: number): number {
    return oz / 35.27396
  }

  /**
   * Convertit des litres en gallons
   * @param liters - Volume en litres
   */
  static litersToGallons(liters: number): number {
    return liters * 0.264172
  }

 /**
   * Convertit des gallons en litres
   * @param gallons - Volume en gallons
   */
  static gallonsToLiters(gallons: number): number {
    return gallons / 0.264172
  }

 /**
   * Convertit des onces en litres
   * @param once - Volume en onces
   */
  static onceToLiter(once: number): number {
    return once / 33.814
  }

  /**
   * Convertit des litres en onces
   * @param liter - Volume en litres
   */
  static literToOnce(liter: number): number {
    return liter * 33.814
  }

 /**
   * Convertit des litres par kilogramme en quarts par livre
   * @param litersPerKg - Ratio en litres par kilogramme
   */
  static litersPerKgToQuartsPerLb(litersPerKg: number): number {
    return litersPerKg * 0.479305709
  }

  /**
   * Convertit des quarts par livre en litres par kilogramme
   * @param quartsPerLb - Ratio en quarts par livre
   */
  static quartsPerLbToLitersPerKg(quartsPerLb: number): number {
    return quartsPerLb / 0.479305709
  }

  /**
   * Convertit des Celsius en Fahrenheit
   * @param celcius - Température en Celsius
   */
  static cToF(celcius: number): number {
    return celcius * 1.8 + 32
  }

  /**
   * Convertit des Fahrenheit en Celsius
   * @param fahrenheit - Température en Fahrenheit
   */
  static fToC(fahrenheit: number): number {
    return (fahrenheit - 32) / 1.8
  }

  /**
   * Convertit un rendement en points par gallon (PPG)
   * @param yieldPercentage - Rendement en pourcentage
   */
  static yieldToPpg(yieldPercentage: number): number {
    return yieldPercentage * 0.46214
  }

  /**
   * Convertit des points par gallon (PPG) en rendement
   * @param ppg - Points par gallon
   */
  static ppgToYield(ppg: number): number {
    return ppg * 2.16385
  }

  /**
   * Convertit une densité spécifique en degrés Plato
   * @param sg - Densité spécifique
   */
  static sgToPlato(sg: number): number {
    return (-1 * 616.868) + (1111.14 * sg) - (630.272 * Math.pow(sg, 2)) + (135.997 * Math.pow(sg, 3))
  }

  /**
   * Convertit des degrés Plato en densité spécifique
   * @param plato - Degrés Plato
   */
  static platoToSg(plato: number): number {
    return 1 + (plato / (258.6 - ((plato / 258.2) * 227.1)))
  }

  /**
   * Convertit un SRM en EBC
   * @param srm - Couleur en SRM
   */
  static srmToEbc(srm: number): number {
    return srm * 1.97
  }

  /**
   * Convertit un EBC en SRM
   * @param ebc - Couleur en EBC
   */
  static ebcToSrm(ebc: number): number {
    return ebc * 0.508
  }

  /**
   * Convertit un SRM en Lovibond
   * @param srm - Couleur en SRM
   */
  static srmToLovibond(srm: number): number {
    return (srm + 0.76) / 1.3546
  }

  /**
   * Convertit un Lovibond en SRM
   * @param lovibond - Couleur en Lovibond
   */
  static lovibondToSrm(lovibond: number): number {
    return 1.3546 * lovibond - 0.76
  }

 /**
   * Convertit un SRM en valeurs RGB
   * @param srm - Couleur en SRM
   */
  static srmToRgb(srm: number): [number, number, number] {
    const r = Math.round(Math.min(25, Math.max(0, 255 * (0.975 ** srm))))
    const g = Math.round(Math.min(255, Math.max(0, 245 * (0.88 ** srm))))
    const b = Math.round(Math.min(255, Math.max(0, 20 * (0.7 ** srm))))
    return [r, g, b]
  }

  /**
   * Convertit un SRM en chaîne CSS
   * @param srm - Couleur en SRM
   */
  static srmToCss(srm: number): string {
    const [r, g, b] = RecipeUtils.srmToRgb(srm)
    return `rgb(${r}, ${g}, ${b})`
  }

  /**
   * Convertit un SRM en nom de couleur
   * @param srm - Couleur en SRM
   */
  static srmToName(srm: number): string {
    const colorNames = [
      [2, 'pale straw'],
      [3, 'straw'],
      [4, 'yellow'],
      [6, 'gold'],
      [9, 'amber'],
      [14, 'deep amber'],
      [17, 'copper'],
      [18, 'deep copper'],
      [22, 'brown'],
      [30, 'dark brown'],
      [35, 'very dark brown'],
      [40, 'black']
    ]
    
    let color = colorNames[0][1] as string
    for (const [threshold, name] of colorNames) {
      if ((threshold as number) <= srm) {
        color = name as string
      }
    }
    return color
  }

  /**
   * Calcule le temps nécessaire pour chauffer un volume d'eau
   * @param liters - Volume en litres
   * @param degrees - Différence de température en degrés
   * @param energy - Énergie en kJ (par défaut 80)
   */
 static timeToHeat(liters: number, degrees: number, energy?: number): number {
    const degreesToUse = degrees || 80
    const kj = 4.19 * liters * degreesToUse
    const minutes = kj / (energy || 9000) * 60
    return minutes
 }

  /**
   * Extrait la valeur et l'unité d'une chaîne de caractères
   * @param dValue - Valeur avec unité (ex: "5 kg", 10)
   */
  static extarctDisplayValue(dValue: string | number): { weight: number; unitie?: string } {
    const value: { weight: number; unitie?: string } = { weight: 0 }
    
    if (typeof dValue === 'string') {
      const splitted = dValue.split(' ')
      value.weight = parseFloat(splitted[0])
      value.unitie = splitted[1]
    } else {
      value.weight = parseFloat(dValue.toString())
    }
    
    return value
  }

  /**
   * Vérifie si une valeur est d'un certain type
   * @param type - Type à vérifier
   * @param val - Valeur à tester
   */
 static isType(type: string, val: any): boolean {
    return val.constructor.name.toLowerCase() === type
  }

  /**
   * Récupère la date actuelle au format JJ/MM/AA
   */
 static getDate(): string {
    const date = new Date()
    const year = '' + date.getFullYear()
    const month = date.getMonth() + 1
    return date.getDate() + '/' + month + '/' + year.slice(2)
  }
}