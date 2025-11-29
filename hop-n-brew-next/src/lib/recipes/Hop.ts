import { IRecipe, IHop } from './types'
import { RecipeUtils } from './RecipeUtils'

/**
 * Représente un houblon dans une recette
 */
export class Hop implements IHop {
  id?: number;
  _id?: string;
  name?: string
  amount?: number | null = null
  displayAmount?: string | null = null
  parent?: IRecipe
  alpha: number | null = null
  use: string | null = null
  time: number | null = null
  form: string | null = null
  beta: number | null = null
  hsi: number | null = null
  origin: string | null = null
  substitutes: string | null = null
  notes: string | null = null
  percentLost: number | null = null
  inventory: number | null = null
 type: string | null = null
  phenolicCompounds: number | null = null
  createdAt?: Date;
 updatedAt?: Date;

  /**
   * Crée une nouvelle instance de houblon
   * @param options - Options de configuration du houblon
   */
  constructor(options?: Partial<IHop>) {
    if (options) {
      Object.assign(this, options)
    }
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  /**
   * Récupère la liste des formes de houblon possibles
   */
  static getFormList(): string[] {
    return ['Pellet', 'Plug', 'Leaf']
  }

  /**
   * Récupère la liste des utilisations possibles du houblon
   */
  static getUseList(): string[] {
    return ['Boil', 'Dry Hop', 'Mash', 'First Wort', 'Aroma']
  }

  /**
   * Récupère la quantité avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'g')
   */
  getAmount(unit: string = 'g'): number {
    if (this.displayAmount) {
      return RecipeUtils.convertTo(this.displayAmount, unit, 3)
    } else if (this.amount !== null && this.amount !== undefined) {
      return RecipeUtils.convertTo(`${this.amount} kg`, unit, 3)
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
      this.amount = RecipeUtils.convertTo(`${val} ${unit}`, 'kg', 3)
      this.displayAmount = `${val} ${unit}`
      if (this.parent) {
        const recipe = this.parent as any
        if (recipe.updateIbu) {
          recipe.updateIbu()
        }
      }
    }
  }

  /**
   * Calcule l'amertume apportée par ce houblon
   * @param method - Méthode de calcul (tinseth, rager, garetz)
   * @param og - Densité initiale
   * @param batchSize - Taille du lot
   * @param whirpool - Temps de whirpool (optionnel)
   */
  getBitterness(method: string, og: number, batchSize: number, whirpool?: number): number {
    // Implémentation du calcul d'IBU selon différentes méthodes
    switch (method.toLowerCase()) {
      case 'tinseth':
        return this.calcTinseth(og, batchSize, whirpool)
      case 'rager':
        return this.calcRager(og, batchSize)
      case 'garetz':
        return this.calcGaretz(og, batchSize)
      default:
        return this.calcTinseth(og, batchSize, whirpool)
    }
  }

  /**
   * Calcule l'IBU selon la méthode Tinseth
   * @param og - Densité initiale
   * @param batchSize - Taille du lot
   * @param whirpool - Temps de whirpool (optionnel)
   */
  private calcTinseth(og: number, batchSize: number, whirpool?: number): number {
    if (
      this.alpha === null || 
      this.amount === null || 
      this.amount === undefined || 
      this.time === null ||
      this.use === null
    ) {
      return 0
    }

    // Ajustement pour le type d'utilisation
    let useAdjustment = 1.0
    if (this.use === 'Dry Hop') useAdjustment = 0.0
    if (this.use === 'Mash') useAdjustment = 0.0
    if (this.use === 'First Wort') useAdjustment = 1.1
    if (this.use === 'Aroma') useAdjustment = 0.0
    
    // Ajustement pour le format
    let formAdjustment = 1.0
    if (this.form === 'Pellet') formAdjustment = 1.1
    if (this.form === 'Plug') formAdjustment = 1.05
    
    // Facteur de densité
    const gravityFactor = 1.65 * Math.pow(0.000125, og - 1.0)
    
    // Facteur de temps d'ébullition
    const timeFactor = (1 - Math.exp(-0.04 * (this.time + (whirpool || 0)))) / 4.15
    
    // Calcul final
    const bitterness = useAdjustment * formAdjustment * gravityFactor * timeFactor * 
      ((this.alpha / 100) * this.getAmount('g') * 1000) / batchSize
    
    return bitterness
  }

  /**
   * Calcule l'IBU selon la méthode Rager
   * @param og - Densité initiale
   * @param batchSize - Taille du lot
   */
  private calcRager(og: number, batchSize: number): number {
    if (
      this.alpha === null || 
      this.amount === null || 
      this.amount === undefined || 
      this.time === null
    ) {
      return 0
    }

    // Facteur de densité
    const gravityFactor = (og - 1.050) / 0.2
    
    // Facteur de temps d'ébullition
    const timeFactor = (18.11 + 13.86 * Math.tanh((this.time - 31.32) / 18.27)) / 1000
    
    // Calcul final
    const bitterness = timeFactor * this.alpha * this.getAmount('g') / batchSize
    const adjustedBitterness = bitterness * (1 + gravityFactor)
    
    return adjustedBitterness
  }

  /**
   * Calcule l'IBU selon la méthode Garetz
   * @param og - Densité initiale
   * @param batchSize - Taille du lot
   */
  private calcGaretz(og: number, batchSize: number): number {
    if (
      this.alpha === null || 
      this.amount === null || 
      this.amount === undefined || 
      this.time === null
    ) {
      return 0
    }

    // Facteur de densité
    const gravityFactor = (og - 1.050) / 0.2
    
    // Facteur de temps d'ébullition
    const timeFactor = (2.37 * Math.pow(1.0045, this.time) - 1) / 1000
    
    // Calcul final
    const bitterness = timeFactor * this.alpha * this.getAmount('g') / batchSize
    const adjustedBitterness = bitterness * (1 + gravityFactor)
    
    return adjustedBitterness
  }

  /**
   * Convertit le houblon en objet JSON
   */
  toJSON(): Partial<IHop> {
    return {
      id: this.id,
      _id: this._id,
      name: this.name,
      amount: this.amount,
      displayAmount: this.displayAmount,
      parent: this.parent,
      alpha: this.alpha,
      use: this.use,
      time: this.time,
      form: this.form,
      beta: this.beta,
      hsi: this.hsi,
      origin: this.origin,
      substitutes: this.substitutes,
      notes: this.notes,
      percentLost: this.percentLost,
      inventory: this.inventory,
      type: this.type,
      phenolicCompounds: this.phenolicCompounds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
 }
}