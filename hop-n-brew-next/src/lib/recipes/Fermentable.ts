import { IRecipe, IFermentable } from './types'
import { RecipeUtils } from './RecipeUtils'

/**
 * Représente un ingrédient fermentescible dans une recette
 */
export class Fermentable implements IFermentable {
  id?: number;
  _id?: string;
  name?: string
 type: string = ''
  amount: number = 0
  yield: number | null = null
  color: number | null = 0
  addAfterBoil: boolean | null = null
  origin: string | null = null
  supplier: string | null = null
  notes: string | null = null
  coarseFineDiff: number | null = null
  moisture: number | null = null
 diastaticPower: number | null = null
  protein: number | null = null
  maxInBatch: number | null = null
  recommendMash: boolean | null = null
 ibuGalPerLb: number | null = null
  displayAmount: string | null = null
  potential: number | null = null
  inventory: number | null = null
  price: number | null = null
  displayColor: string | null = null
 parent?: IRecipe
  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Crée une nouvelle instance de fermentescible
   * @param options - Options de configuration du fermentescible
   */
  constructor(options?: Partial<IFermentable>) {
    if (options) {
      Object.assign(this, options)
    }
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  /**
   * Récupère la liste des types de fermentescibles possibles
   */
  static getTypeList(): string[] {
    return ['Grain', 'Sugar', 'Extract', 'Dry Extract', 'Adjunct']
  }

  /**
   * Récupère la quantité avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'kg')
   */
  getAmount(unit: string = 'kg'): number {
    if (this.displayAmount) {
      return RecipeUtils.convertTo(this.displayAmount, unit, 3)
    } else {
      return RecipeUtils.convertTo(`${this.amount} kg`, unit, 3)
    }
  }

  /**
   * Définit la quantité
   * @param val - Valeur de la quantité
   * @param unit - Unité de la quantité (par défaut 'kg')
   */
 setAmount(val: number, unit: string = 'kg'): void {
    if (val !== this.amount) {
      this.amount = RecipeUtils.convertTo(`${val} ${unit}`, 'kg', 3)
      this.displayAmount = `${val} ${unit}`
      if (this.parent) {
        const recipe = this.parent as any
        if (recipe.updateOg) {
          recipe.updateOg()
        }
      }
    }
 }

  /**
   * Récupère la couleur avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'ebc')
   */
  getColor(unit: string = 'ebc'): number {
    if (this.displayColor) {
      return RecipeUtils.convertTo(this.displayColor, unit)
    } else {
      return this.color || 0
    }
  }

 /**
   * Définit la couleur
   * @param val - Valeur de la couleur
   * @param unit - Unité de la couleur (par défaut 'ebc')
   */
 setColor(val: number, unit: string = 'ebc'): void {
    if (val !== this.color) {
      this.color = val
      this.displayColor = `${val} ${unit}`
      this.calcData()
    }
  }

 /**
   * Calcule la quantité de sucre contribuée par ce fermentescible
   * @param efficiency - Efficacité de l'empâtage
   */
  calcSugar(efficiency: number): number {
    const weight = this.displayAmount 
      ? RecipeUtils.convertTo(this.displayAmount, 'kg') 
      : this.amount
    return weight * ((this.yield || 0) / 100) * (efficiency / 10)
  }

  /**
   * Calcule la contribution à la couleur
   * @param batchSize - Taille du lot
   */
  calcColor(batchSize: number): number {
    const weight = this.displayAmount 
      ? RecipeUtils.convertTo(this.displayAmount, 'kg') 
      : this.amount
    const color = this.displayColor 
      ? RecipeUtils.convertTo(this.displayColor, 'ebc') 
      : (this.color || 0)

    return 2.9396 * (4.23 * color * weight / batchSize) ** 0.6859
 }

  /**
   * Calcule les données du fermentescible
   */
  calcData(): void {
    // Implémentation de calculs supplémentaires si nécessaire
  }

 /**
   * Convertit le fermentescible en objet JSON
   */
  toJSON(): Partial<IFermentable> {
    return {
      id: this.id,
      _id: this._id,
      name: this.name,
      type: this.type,
      amount: this.amount,
      yield: this.yield,
      color: this.color,
      addAfterBoil: this.addAfterBoil,
      origin: this.origin,
      supplier: this.supplier,
      notes: this.notes,
      coarseFineDiff: this.coarseFineDiff,
      moisture: this.moisture,
      diastaticPower: this.diastaticPower,
      protein: this.protein,
      maxInBatch: this.maxInBatch,
      recommendMash: this.recommendMash,
      ibuGalPerLb: this.ibuGalPerLb,
      displayAmount: this.displayAmount,
      potential: this.potential,
      inventory: this.inventory,
      price: this.price,
      displayColor: this.displayColor,
      parent: this.parent,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}