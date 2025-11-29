import { IRecipe, IMisc } from './types'
import { RecipeUtils } from './RecipeUtils'

/**
 * Représente un ingrédient divers dans une recette
 */
export class Misc implements IMisc {
  id?: number;
  _id?: string;
  name?: string
  amount?: number | null = null
  displayAmount?: string | null = null
  parent?: IRecipe
  type: string | null = null
  use: string | null = null
  time: number | null = null
  amountIsWeight: boolean | null = null
  useFor: string | null = null
  notes: string | null = null
  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Crée une nouvelle instance d'ingrédient divers
   * @param options - Options de configuration de l'ingrédient
   */
  constructor(options?: Partial<IMisc>) {
    if (options) {
      Object.assign(this, options)
    }
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  /**
   * Récupère la liste des types d'ingrédients divers possibles
   */
  static getTypeList(): string[] {
    return ['Spice', 'Fining', 'Water Agent', 'Herb', 'Flavor', 'Other']
  }

  /**
   * Récupère la liste des utilisations possibles
   */
  static getUseList(): string[] {
    return ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling']
  }

  /**
   * Récupère la quantité avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'g' ou 'l' selon amountIsWeight)
   */
  getAmount(unit?: string): number {
    if (this.displayAmount) {
      return RecipeUtils.convertTo(this.displayAmount, unit || 'g', 3)
    } else if (this.amount !== null && this.amount !== undefined) {
      // Si amountIsWeight est vrai, l'unité est en kg, sinon en litres
      const sourceUnit = this.amountIsWeight ? 'kg' : 'l'
      return RecipeUtils.convertTo(`${this.amount} ${sourceUnit}`, unit || sourceUnit, 3)
    } else {
      return 0
    }
  }

  /**
   * Définit la quantité
   * @param val - Valeur de la quantité
   * @param unit - Unité de la quantité (par défaut 'g' ou 'l' selon amountIsWeight)
   */
  setAmount(val: number, unit?: string): void {
    if (val !== this.amount) {
      // Si amountIsWeight est vrai, l'unité cible est en kg, sinon en litres
      const targetUnit = unit || (this.amountIsWeight ? 'kg' : 'l')
      this.amount = RecipeUtils.convertTo(`${val} ${targetUnit}`, targetUnit, 3)
      this.displayAmount = `${val} ${targetUnit}`
    }
  }

  /**
   * Convertit l'ingrédient divers en objet JSON
   */
  toJSON(): Partial<IMisc> {
    return {
      id: this.id,
      _id: this._id,
      name: this.name,
      amount: this.amount,
      displayAmount: this.displayAmount,
      parent: this.parent,
      type: this.type,
      use: this.use,
      time: this.time,
      amountIsWeight: this.amountIsWeight,
      useFor: this.useFor,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}