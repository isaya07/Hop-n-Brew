/**
 * Représente un équipement de brassage
 */
import { IEquipment } from './types'
import { RecipeUtils } from './RecipeUtils'

export class Equipment implements IEquipment {
  name: string = 'Generic Equipment'
  version: number | null = null
  type: string | null = null
  boilSize: number | null = null
  batchSize: number | null = null
  tubingLength: number | null = null
  tubingDiameter: number | null = null
  lauterDeadspace: number | null = null
  trubChillerLoss: number | null = null
  evapRate: number | null = 4 // 4% par heure
  boilTime: number | null = 60
  calcBoilVolume: boolean | null = true
  lauterEff: number | null = null
  batchSparge: boolean | null = false
  displayBoilSize: string | null = null
  displayBatchSize: string | null = null
  displayTubingLength: string | null = null
  displayTubingDiameter: string | null = null
  displayLauterDeadspace: string | null = null
  displayTrubChillerLoss: string | null = null
  displayEvapRate: string | null = null
  displayBoilTime: string | null = null

  /**
   * Crée une nouvelle instance d'équipement
   * @param options - Options de configuration de l'équipement
   */
  constructor(options?: Partial<IEquipment>) {
    if (options) {
      Object.assign(this, options)
    }
  }

  /**
   * Récupère la taille de l'ébullition avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
 getBoilSize(unit: string = 'l'): number {
    if (this.displayBoilSize) {
      return RecipeUtils.convertTo(this.displayBoilSize, unit)
    } else {
      return this.boilSize || 0
    }
  }

 /**
   * Définit la taille de l'ébullition
   * @param val - Valeur de la taille de l'ébullition
   * @param unit - Unité de la taille de l'ébullition
   */
 setBoilSize(val: number, unit: string = 'l'): void {
    this.boilSize = val
    this.displayBoilSize = `${val} ${unit}`
  }

 /**
   * Récupère la taille du lot avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
  getBatchSize(unit: string = 'l'): number {
    if (this.displayBatchSize) {
      return RecipeUtils.convertTo(this.displayBatchSize, unit)
    } else {
      return this.batchSize || 0
    }
  }

 /**
   * Définit la taille du lot
   * @param val - Valeur de la taille du lot
   * @param unit - Unité de la taille du lot
   */
  setBatchSize(val: number, unit: string = 'l'): void {
    this.batchSize = val
    this.displayBatchSize = `${val} ${unit}`
  }

  /**
   * Récupère la longueur du tube avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'm')
   */
  getTubingLength(unit: string = 'm'): number {
    if (this.displayTubingLength) {
      return RecipeUtils.convertTo(this.displayTubingLength, unit)
    } else {
      return this.tubingLength || 0
    }
  }

  /**
   * Récupère le diamètre du tube avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'cm')
   */
  getTubingDiameter(unit: string = 'cm'): number {
    if (this.displayTubingDiameter) {
      return RecipeUtils.convertTo(this.displayTubingDiameter, unit)
    } else {
      return this.tubingDiameter || 0
    }
  }

 /**
   * Récupère le volume mort de la cuve avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
  getLauterDeadspace(unit: string = 'l'): number {
    if (this.displayLauterDeadspace) {
      return RecipeUtils.convertTo(this.displayLauterDeadspace, unit)
    } else {
      return this.lauterDeadspace || 0
    }
  }

  /**
   * Récupère les pertes de houblon/trub avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
  getTrubChillerLoss(unit: string = 'l'): number {
    if (this.displayTrubChillerLoss) {
      return RecipeUtils.convertTo(this.displayTrubChillerLoss, unit)
    } else {
      return this.trubChillerLoss || 0
    }
  }

 /**
   * Récupère le taux d'évaporation
   */
 getEvapRate(): number {
    if (this.displayEvapRate) {
      return parseFloat(this.displayEvapRate.split(' ')[0])
    } else {
      return this.evapRate || 0
    }
  }

  /**
   * Récupère le temps d'ébullition
   */
 getBoilTime(): number {
    if (this.displayBoilTime) {
      return RecipeUtils.parseDuration(this.displayBoilTime)
    } else {
      return this.boilTime || 0
    }
  }

  /**
   * Convertit l'équipement en objet JSON
   */
  toJSON(): Partial<IEquipment> {
    return {
      name: this.name,
      version: this.version,
      type: this.type,
      boilSize: this.boilSize,
      batchSize: this.batchSize,
      tubingLength: this.tubingLength,
      tubingDiameter: this.tubingDiameter,
      lauterDeadspace: this.lauterDeadspace,
      trubChillerLoss: this.trubChillerLoss,
      evapRate: this.evapRate,
      boilTime: this.boilTime,
      calcBoilVolume: this.calcBoilVolume,
      lauterEff: this.lauterEff,
      batchSparge: this.batchSparge,
      displayBoilSize: this.displayBoilSize,
      displayBatchSize: this.displayBatchSize,
      displayTubingLength: this.displayTubingLength,
      displayTubingDiameter: this.displayTubingDiameter,
      displayLauterDeadspace: this.displayLauterDeadspace,
      displayTrubChillerLoss: this.displayTrubChillerLoss,
      displayEvapRate: this.displayEvapRate,
      displayBoilTime: this.displayBoilTime
    }
  }
}