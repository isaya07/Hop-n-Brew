import { IRecipe, IYeast } from './types'
import { RecipeUtils } from './RecipeUtils'

/**
 * Représente une levure dans une recette
 */
export class Yeast implements IYeast {
  id?: number;
  _id?: string;
  name?: string
  amount?: number | null = null
  displayAmount?: string | null = null
  parent?: IRecipe
  type: string | null = null
  form: string | null = null
  amountIsWeight: boolean | null = null
  laboratory: string | null = null
  productId: string | null = null
  minTemperature: number | null = null
  maxTemperature: number | null = null
  fermentationTemp: number | null = null
  attenuation: number | null = null
  notes: string | null = null
  bestFor: string | null = null
  timesCultured: number | null = null
  maxReuse: number | null = null
  addToSecondary: boolean | null = null
  inventory: number | null = null
  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Crée une nouvelle instance de levure
   * @param options - Options de configuration de la levure
   */
  constructor(options?: Partial<IYeast>) {
    if (options) {
      Object.assign(this, options)
    }
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  /**
   * Récupère la liste des types de levures possibles
   */
  static getTypeList(): string[] {
    return ['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne']
  }

  /**
   * Récupère la liste des formes de levures possibles
   */
  static getFormList(): string[] {
    return ['Liquid', 'Dry', 'Slant', 'Culture']
  }

  /**
   * Récupère la quantité avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'g')
   */
  getAmount(unit: string = 'g'): number {
    if (this.displayAmount) {
      return RecipeUtils.convertTo(this.displayAmount, unit, 3)
    } else if (this.amount !== null && this.amount !== undefined) {
      // Si amountIsWeight est vrai, l'unité est en kg, sinon en litres
      const sourceUnit = this.amountIsWeight ? 'kg' : 'l'
      return RecipeUtils.convertTo(`${this.amount} ${sourceUnit}`, unit, 3)
    } else {
      return 0
    }
  }

  /**
   * Définit la quantité
   * @param val - Valeur de la quantité
   * @param unit - Unité de la quantité (par défaut 'g')
   */
  setAmount(val: number, unit: string = 'g'): void {
    if (val !== this.amount) {
      // Si amountIsWeight est vrai, l'unité cible est en kg, sinon en litres
      const targetUnit = this.amountIsWeight ? 'kg' : 'l'
      this.amount = RecipeUtils.convertTo(`${val} ${unit}`, targetUnit, 3)
      this.displayAmount = `${val} ${unit}`
      if (this.parent) {
        const recipe = this.parent as any
        if (recipe.updateFg) {
          recipe.updateFg()
        }
      }
    }
  }

  /**
   * Récupère l'atténuation de la levure
   */
  getAttenuation(): number {
    return this.attenuation || 75 // Valeur par défaut de 75%
  }

  /**
   * Calcule la densité finale estimée
   * @param og - Densité initiale
   */
  calcFg(og: number): number {
    const attenuation = this.getAttenuation()
    return ((og - 1) * (1 - (attenuation / 100))) + 1
  }

  /**
   * Calcule le taux d'alcool par volume
   * @param og - Densité initiale
   * @param fg - Densité finale
   */
  calcAbv(og: number, fg: number): number {
    return (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794)
  }

  /**
   * Calcule le nombre de cellules viables
   * @param daysSinceProduction - Jours depuis la production
   * @param packets - Nombre de paquets
   */
  calcViability(daysSinceProduction: number, packets: number = 1): number {
    // Pour les levures liquides
    if (this.form === 'Liquid') {
      // Viabilité diminue de 20% par mois
      const monthlyLoss = 0.20
      const months = daysSinceProduction / 30
      const viability = Math.pow(1 - monthlyLoss, months)
      return viability * packets
    }
    
    // Pour les levures sèches
    if (this.form === 'Dry') {
      // Viabilité diminue de 5% par an
      const yearlyLoss = 0.05
      const years = daysSinceProduction / 365
      const viability = Math.pow(1 - yearlyLoss, years)
      return viability * packets
    }
    
    // Pour les autres formes, on assume une viabilité de 100%
    return packets
  }

  /**
   * Calcule le nombre de cellules nécessaires pour l'inoculation
   * @param batchSize - Taille du lot en litres
   * @param starterCells - Cellules provenant d'un starter (optionnel)
   */
  calcRequiredCells(batchSize: number, starterCells?: number): number {
    // Cellules recommandées par millilitre (en millions)
    const cellsPerMl = this.type === 'Lager' ? 1.5 : 1.0
    
    // Calcul total des cellules nécessaires
    const requiredCells = batchSize * 1000 * cellsPerMl // Convertir litres en ml
    
    // Soustraire les cellules du starter si fourni
    if (starterCells) {
      return Math.max(0, requiredCells - starterCells)
    }
    
    return requiredCells
  }

  /**
   * Convertit la levure en objet JSON
   */
  toJSON(): Partial<IYeast> {
    return {
      id: this.id,
      _id: this._id,
      name: this.name,
      amount: this.amount,
      displayAmount: this.displayAmount,
      parent: this.parent,
      type: this.type,
      form: this.form,
      amountIsWeight: this.amountIsWeight,
      laboratory: this.laboratory,
      productId: this.productId,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      fermentationTemp: this.fermentationTemp,
      attenuation: this.attenuation,
      notes: this.notes,
      bestFor: this.bestFor,
      timesCultured: this.timesCultured,
      maxReuse: this.maxReuse,
      addToSecondary: this.addToSecondary,
      inventory: this.inventory,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
 }
}