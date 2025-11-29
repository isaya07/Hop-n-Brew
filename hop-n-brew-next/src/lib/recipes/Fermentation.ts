/**
 * Représente un profil de fermentation
 */
import { IFermentation } from './types'

export class Fermentation implements IFermentation {
  name: string = 'Generic Fermentation'
  description: string | null = null
  type: string | null = null
  form: string | null = null
  amount: number | null = null
  amountIsWeight: boolean | null = null
  yield: number | null = null
  attenutation: number | null = null
  notes: string | null = null
  bestFor: string | null = null
  timesCultured: number | null = null
  maxReuse: number | null = null
  addToSecondary: boolean | null = null
  displayAmount: string | null = null
  inventory: number | null = null

  /**
   * Crée une nouvelle instance de fermentation
   * @param options - Options de configuration de la fermentation
   */
  constructor(options?: Partial<IFermentation>) {
    if (options) {
      Object.assign(this, options)
    }
  }

  /**
   * Récupère l'atténuation
   */
  getAttenuation(): number {
    return this.attenutation || 0
  }

  /**
   * Convertit la fermentation en objet JSON
   */
  toJSON(): Partial<IFermentation> {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      form: this.form,
      amount: this.amount,
      amountIsWeight: this.amountIsWeight,
      yield: this.yield,
      attenutation: this.attenutation,
      notes: this.notes,
      bestFor: this.bestFor,
      timesCultured: this.timesCultured,
      maxReuse: this.maxReuse,
      addToSecondary: this.addToSecondary,
      displayAmount: this.displayAmount,
      inventory: this.inventory
    }
  }
}