/**
 * Représente un profil de carbonatation
 */
import { ICarbonation } from './types'

export class Carbonation implements ICarbonation {
  name: string = 'Generic Carbonation'
  type: string = 'Natural'
  amount: number | null = null
 notes: string | null = null

  /**
   * Crée une nouvelle instance de carbonatation
   * @param options - Options de configuration de la carbonatation
   */
  constructor(options?: Partial<ICarbonation>) {
    if (options) {
      Object.assign(this, options)
      
      // Définir les valeurs par défaut si elles ne sont pas fournies
      if (!options?.type) {
        this.type = 'Natural'
      }
      if (!options?.name) {
        this.name = 'Generic Carbonation'
      }
    }
  }

  /**
   * Récupère la quantité de carbonatation
   */
 getAmount(): number {
    return this.amount || 0
  }

  /**
   * Convertit la carbonatation en objet JSON
   */
  toJSON(): Partial<ICarbonation> {
    return {
      name: this.name,
      type: this.type,
      amount: this.amount,
      notes: this.notes
    }
  }
}