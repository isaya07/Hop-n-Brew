/**
 * Représente un style de bière
 */
import { IStyle } from './types'

export class Style implements IStyle {
  name: string = 'Generic Style'
  category: string | null = null
  categoryNumber: number | null = null
  styleLetter: string | null = null
  styleGuide: string | null = 'BJCP'
  type: string | null = 'Lager'
  ogMin: number | null = null
  ogMax: number | null = null
  fgMin: number | null = null
  fgMax: number | null = null
  ibuMin: number | null = null
  ibuMax: number | null = null
  colorSrmMin: number | null = null
  colorSrmMax: number | null = null
  carbMin: number | null = null
  carbMax: number | null = null
  abvMin: number | null = null
  abvMax: number | null = null
  notes: string | null = null
  profile: string | null = null
  ingredients: string | null = null
  examples: string | null = null

  /**
   * Crée une nouvelle instance de style
   * @param options - Options de configuration du style
   */
  constructor(options?: Partial<IStyle>) {
    if (options) {
      Object.assign(this, options)
    }
  }

  /**
   * Vérifie si une valeur est dans la plage pour une propriété spécifique
   * @param value - Valeur à vérifier
   * @param minProp - Nom de la propriété min
   * @param maxProp - Nom de la propriété max
   */
 isInRange(value: number, minProp: keyof IStyle, maxProp: keyof IStyle): boolean {
    const min = this[minProp] as number | null
    const max = this[maxProp] as number | null
    
    if (min !== null && max !== null) {
      return value >= min && value <= max
    } else if (min !== null) {
      return value >= min
    } else if (max !== null) {
      return value <= max
    }
    return true
  }

  /**
   * Vérifie si une densité initiale est dans la plage du style
   * @param og - Densité initiale à vérifier
   */
  isValidOg(og: number): boolean {
    return this.isInRange(og, 'ogMin', 'ogMax')
  }

  /**
   * Vérifie si une densité finale est dans la plage du style
   * @param fg - Densité finale à vérifier
   */
  isValidFg(fg: number): boolean {
    return this.isInRange(fg, 'fgMin', 'fgMax')
  }

  /**
   * Vérifie si un IBU est dans la plage du style
   * @param ibu - IBU à vérifier
   */
  isValidIbu(ibu: number): boolean {
    return this.isInRange(ibu, 'ibuMin', 'ibuMax')
  }

  /**
   * Vérifie si une couleur est dans la plage du style
   * @param color - Couleur à vérifier
   */
  isValidColor(color: number): boolean {
    return this.isInRange(color, 'colorSrmMin', 'colorSrmMax')
  }

  /**
   * Vérifie si un taux d'alcool est dans la plage du style
   * @param abv - Taux d'alcool à vérifier
   */
  isValidAbv(abv: number): boolean {
    return this.isInRange(abv, 'abvMin', 'abvMax')
  }

  /**
   * Convertit le style en objet JSON
   */
  toJSON(): Partial<IStyle> {
    return {
      name: this.name,
      category: this.category,
      categoryNumber: this.categoryNumber,
      styleLetter: this.styleLetter,
      styleGuide: this.styleGuide,
      type: this.type,
      ogMin: this.ogMin,
      ogMax: this.ogMax,
      fgMin: this.fgMin,
      fgMax: this.fgMax,
      ibuMin: this.ibuMin,
      ibuMax: this.ibuMax,
      colorSrmMin: this.colorSrmMin,
      colorSrmMax: this.colorSrmMax,
      carbMin: this.carbMin,
      carbMax: this.carbMax,
      abvMin: this.abvMin,
      abvMax: this.abvMax,
      notes: this.notes,
      profile: this.profile,
      ingredients: this.ingredients,
      examples: this.examples
    }
  }
}