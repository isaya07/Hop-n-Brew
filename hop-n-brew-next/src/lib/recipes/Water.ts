import { IRecipe, IWater } from './types'
import { RecipeUtils } from './RecipeUtils'

/**
 * Représente l'eau dans une recette
 */
export class Water implements IWater {
  id?: number;
  _id?: string;
  name?: string
  amount?: number | null = null
 displayAmount?: string | null = null
 parent?: IRecipe
  calcium: number | null = null
  bicarbonate: number | null = null
  sulfate: number | null = null
  chloride: number | null = null
  sodium: number | null = null
  magnesium: number | null = null
  ph: number | null = null
  notes: string | null = null
  createdAt?: Date;
 updatedAt?: Date;

  /**
   * Crée une nouvelle instance d'eau
   * @param options - Options de configuration de l'eau
   */
  constructor(options?: Partial<IWater>) {
    if (options) {
      Object.assign(this, options)
    }
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  /**
   * Récupère la quantité avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
  getAmount(unit: string = 'l'): number {
    if (this.displayAmount) {
      return RecipeUtils.convertTo(this.displayAmount, unit, 3)
    } else if (this.amount !== null && this.amount !== undefined) {
      return RecipeUtils.convertTo(`${this.amount} l`, unit, 3)
    } else {
      return 0
    }
  }

  /**
   * Définit la quantité
   * @param val - Valeur de la quantité
   * @param unit - Unité de la quantité (par défaut 'l')
   */
  setAmount(val: number, unit: string = 'l'): void {
    if (val !== this.amount) {
      this.amount = RecipeUtils.convertTo(`${val} ${unit}`, 'l', 3)
      this.displayAmount = `${val} ${unit}`
    }
  }

  /**
   * Calcule la dureté totale de l'eau (ppm)
   */
  calcTotalHardness(): number {
    if (this.calcium === null || this.magnesium === null) {
      return 0
    }
    
    // Dureté totale = (Calcium * 2.5) + (Magnésium * 4.1)
    return (this.calcium * 2.5) + (this.magnesium * 4.1)
  }

  /**
   * Calcule l'alcalinité totale de l'eau (ppm)
   */
  calcTotalAlkalinity(): number {
    if (this.bicarbonate === null) {
      return 0
    }
    
    // Alcalinité totale = Bicarbonate
    return this.bicarbonate
  }

  /**
   * Calcule le rapport sulfate/chlorure
   */
  calcSulfateToChlorideRatio(): number {
    if (this.sulfate === null || this.chloride === null || this.chloride === 0) {
      return 0
    }
    
    return this.sulfate / this.chloride
  }

  /**
   * Calcule la force ionique de l'eau
   */
  calcIonicStrength(): number {
    if (
      this.calcium === null || 
      this.magnesium === null || 
      this.sodium === null || 
      this.bicarbonate === null || 
      this.sulfate === null || 
      this.chloride === null
    ) {
      return 0
    }
    
    // Force ionique = 0.5 * Σ(ci * zi²)
    // où ci est la concentration et zi est la charge de l'ion
    const ca2 = this.calcium / 20.04  // ppm to meq/L (divisé par 20.04)
    const mg2 = this.magnesium / 12.15  // ppm to meq/L (divisé par 12.15)
    const na = this.sodium / 23.0  // ppm to meq/L (divisé par 23.0)
    const hco3 = this.bicarbonate / 61.0  // ppm to meq/L (divisé par 61.0)
    const so4 = this.sulfate / 48.0  // ppm to meq/L (divisé par 48.0)
    const cl = this.chloride / 35.5  // ppm to meq/L (divisé par 35.5)
    
    return 0.5 * (
      (ca2 * 4) +  // Ca²⁺ a une charge de +2, donc z² = 4
      (mg2 * 4) +  // Mg²⁺ a une charge de +2, donc z² = 4
      (na * 1) +   // Na⁺ a une charge de +1, donc z² = 1
      (hco3 * 1) + // HCO₃⁻ a une charge de -1, donc z² = 1
      (so4 * 4) +  // SO₄²⁻ a une charge de -2, donc z² = 4
      (cl * 1)     // Cl⁻ a une charge de -1, donc z² = 1
    )
  }

  /**
   * Calcule le résidu évaporé (ppm)
   */
  calcResidualAlkalinity(): number {
    if (
      this.bicarbonate === null || 
      this.calcium === null || 
      this.magnesium === null
    ) {
      return 0
    }
    
    // Résidu évaporé = Alcalinité - (Calcium / 3.5) - (Magnésium / 7)
    return this.bicarbonate - (this.calcium / 3.5) - (this.magnesium / 7)
  }

  /**
   * Convertit l'eau en objet JSON
   */
  toJSON(): Partial<IWater> {
    return {
      id: this.id,
      _id: this._id,
      name: this.name,
      amount: this.amount,
      displayAmount: this.displayAmount,
      parent: this.parent,
      calcium: this.calcium,
      bicarbonate: this.bicarbonate,
      sulfate: this.sulfate,
      chloride: this.chloride,
      sodium: this.sodium,
      magnesium: this.magnesium,
      ph: this.ph,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}