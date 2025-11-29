import { Fermentable } from './Fermentable'
import { Hop } from './Hop'
import { Yeast } from './Yeast'
import { Misc } from './Misc'
import { Water } from './Water'
import { Mash } from './Mash'
import { Fermentation } from './Fermentation'
import { Carbonation } from './Carbonation'
import { Equipment } from './Equipment'
import { Style } from './Style'
import { RecipeUtils } from './RecipeUtils'
import type { IRecipe, IRecipeIngredient } from './types'

/**
 * Représente une recette de bière complète
 */
export class Recipe implements IRecipe {
  name: string = 'New Recipe'
  notes: string = ''
  brewer: string = 'You'
  asstBrewer: string = 'Hop\'n Brew'
  type: string = 'All Grain'
  equipment: Equipment = new Equipment()
  style: Style = new Style()
  batchSize: number = 20
  boilSize: number = 23
  boilTime: number = 60
  efficiency: number = 75
  fermentables: Fermentable[] = []
 yeasts: Yeast[] = []
 hops: Hop[] = []
  miscs: Misc[] = []
  waters: Water[] = []
  mash: Mash = new Mash()
  fermentation: Fermentation = new Fermentation()
  carbonation: Carbonation = new Carbonation()
  og: number = 0
  fg: number = 0
  tasteNote: string = ''
  tasteRating: string = ''
  date: string = RecipeUtils.getDate()
  estOg: number | null = null
  estFg: number | null = null
  estColor: number | null = null
  ibu: number | null = null
  ibuMethod: string = 'Tinseth'
  estAbv: number | null = null
  abv: number | null = null
  actualEfficiency: number | null = null
  calories: number | null = null
  displayBatchSize: string | null = null
  displayBoilSize: string | null = null
  displayOg: string | null = null
  displayFg: string | null = null

  /**
   * Crée une nouvelle instance de recette
   * @param options - Options de configuration de la recette
   */
  constructor(options?: Partial<IRecipe>) {
    if (options) {
      Object.assign(this, options)
      
      // Initialiser les ingrédients avec les données fournies
      if (options.fermentables) {
        this.fermentables = options.fermentables.map(f => new Fermentable(f))
      }
      if (options.hops) {
        this.hops = options.hops.map(h => new Hop(h))
      }
      if (options.yeasts) {
        this.yeasts = options.yeasts.map(y => new Yeast(y))
      }
      if (options.miscs) {
        this.miscs = options.miscs.map(m => new Misc(m))
      }
      if (options.waters) {
        this.waters = options.waters.map(w => new Water(w))
      }
      if (options.equipment) {
        this.equipment = new Equipment(options.equipment)
      }
      if (options.mash) {
        this.mash = new Mash(options.mash)
      }
      if (options.fermentation) {
        this.fermentation = new Fermentation(options.fermentation)
      }
      if (options.carbonation) {
        this.carbonation = new Carbonation(options.carbonation)
      }
      if (options.style) {
        this.style = new Style(options.style)
      }
    }
    
    this.updateOg()
    this.updateIbu()
  }

  /**
   * Récupère la liste des types de recettes possibles
   */
  static getTypeList(): string[] {
    return ['Extract', 'Partial Mash', 'All Grain']
  }

  /**
   * Récupère la taille du lot avec conversion d'unité optionnelle
   * @param unit - Unité de volume cible (par défaut 'l')
   */
  getBatchSize(unit: string = 'l'): number {
    if (this.displayBatchSize) {
      return RecipeUtils.convertTo(this.displayBatchSize, unit)
    } else {
      return this.batchSize
    }
 }

  /**
   * Définit la taille du lot
   * @param val - Valeur de la taille du lot
   * @param unit - Unité de la taille du lot (par défaut 'l')
   */
  setBatchSize(val: number, unit: string = 'l'): void {
    this.batchSize = val
    this.displayBatchSize = `${val} ${unit}`
  }

  /**
   * Récupère la taille de l'ébullition avec conversion d'unité optionnelle
   * @param unit - Unité de volume cible (par défaut 'l')
   */
  getBoilSize(unit: string = 'l'): number {
    if (this.equipment.calcBoilVolume) this.calculBoilSize()
    if (this.displayBoilSize) {
      return RecipeUtils.convertTo(this.displayBoilSize, unit)
    } else {
      return this.boilSize
    }
  }

  /**
   * Définit la taille de l'ébullition
   * @param val - Valeur de la taille de l'ébullition
   * @param unit - Unité de la taille de l'ébullition (par défaut 'l')
   */
  setBoilSize(val: number, unit: string = 'l'): void {
    this.boilSize = val
    this.displayBoilSize = `${val} ${unit}`
  }

 /**
   * Récupère la densité initiale avec conversion d'unité optionnelle
   * @param unit - Unité de densité cible (par défaut 'sg')
   */
  getOg(unit?: string): number {
    if (this.displayOg) {
      return RecipeUtils.convertTo(this.displayOg, unit || 'sg', 3)
    } else {
      return this.og
    }
 }

  /**
   * Définit la densité initiale
   * @param val - Valeur de la densité initiale
   * @param unit - Unité de la densité initiale
   */
  setOg(val: number, unit?: string): void {
    this.og = val
    this.displayOg = unit ? `${val} ${unit}` : val.toString()
  }

 /**
   * Récupère la densité finale avec conversion d'unité optionnelle
   * @param unit - Unité de densité cible (par défaut 'sg')
   */
 getFg(unit?: string): number {
    if (this.displayFg) {
      return RecipeUtils.convertTo(this.displayFg, unit || 'sg', 3)
    } else {
      return this.fg
    }
  }

  /**
   * Définit la densité finale
   * @param val - Valeur de la densité finale
   * @param unit - Unité de la densité finale
   */
  setFg(val: number, unit?: string): void {
    this.fg = val
    this.displayFg = unit ? `${val} ${unit}` : val.toString()
  }

  /**
   * Récupère la densité initiale estimée
   * @param unit - Unité de densité cible (par défaut 'sg')
   */
 getEstOg(unit: string = 'sg'): number {
    if (!this.estOg) this.updateOg()
    return RecipeUtils.convertTo(this.estOg?.toString() || '0', unit, 3)
 }

  /**
   * Définit la densité initiale estimée
   * @param val - Valeur de la densité initiale estimée
   * @param unit - Unité de la densité initiale estimée
   */
  setEstOg(val: number, unit: string = 'sg'): void {
    this.estOg = RecipeUtils.convertTo(`${val} ${unit}`, 'sg', 3)
  }

  /**
   * Récupère la densité finale estimée
   * @param unit - Unité de densité cible
   */
  getEstFg(unit?: string): number {
    if (!this.estFg) this.updateFg()
    return RecipeUtils.convertTo(this.estFg?.toString() || '0', unit || 'sg', 3)
  }

  /**
   * Définit la densité finale estimée
   * @param val - Valeur de la densité finale estimée
   * @param unit - Unité de la densité finale estimée
   */
  setEstFg(val: number, unit?: string): void {
    this.estFg = RecipeUtils.convertTo(`${val} ${unit || ''}`, 'sg', 3)
  }

  /**
   * Récupère le taux d'alcool estimé
   */
  getEstAbv(): number {
    if (this.estAbv) {
      return RecipeUtils.isType('string', this.estAbv) 
        ? RecipeUtils.roundDecimal(parseFloat((this.estAbv as string).split(' ')[0]), 1)
        : this.estAbv
    } else {
      const abv = this.calculAbv()
      this.setEstAbv(abv)
      return abv
    }
 }

  /**
   * Définit le taux d'alcool estimé
   * @param val - Valeur du taux d'alcool estimé
   */
  setEstAbv(val: number): void {
    this.estAbv = val
  }

  /**
   * Récupère l'IBU (amertume) de la recette
   */
  getIbu(): number {
    if (this.ibu && RecipeUtils.isType('string', this.ibu)) {
      return RecipeUtils.roundDecimal(parseFloat((this.ibu as string).split(' ')[0]), 1)
    } else {
      return this.ibu || 0
    }
  }

  /**
   * Définit l'IBU (amertume) de la recette
   * @param value - Valeur de l'IBU
   */
  setIbu(value: number): void {
    this.ibu = value
  }

  /**
   * Calcule le poids total des fermentescibles
   */
  getFementablesTotal(): number {
    let weight = 0
    for (const fermentable of this.fermentables) {
      weight += fermentable.amount
    }
    return weight
  }

  /**
   * Calcule le taux d'alcool par volume
   */
  calculAbv(): number {
    return RecipeUtils.roundDecimal((76.08 * (this.getEstOg() - this.getEstFg()) / (1.775 - this.getEstOg())) * (this.getEstFg() / 0.794), 1)
  }

  /**
   * Calcule le volume perdu
   */
  getVolLost(): number {
    return this.equipment.trubChillerLoss + this.equipment.lauterDeadspace
  }

 /**
   * Calcule le volume évaporé
   */
  getVolEvap(): number {
    return this.batchSize * (this.equipment.evapRate / 100) * this.boilTime / 60
 }

  /**
   * Calcule la taille de l'ébullition
   */
  calculBoilSize(): void {
    const boil = RecipeUtils.roundDecimal((this.batchSize + this.getVolEvap() + this.getVolLost()) * 1.04, 1)
    this.setBoilSize(boil, 'l')
  }

  /**
   * Met à jour la densité initiale estimée
   */
  updateOg(): void {
    if (this.fermentables.length !== 0) {
      let sugar = 0
      let color = 0
      
      for (const fermentable of this.fermentables) {
        sugar += fermentable.calcSugar(this.efficiency)
        color += fermentable.calcColor(this.batchSize)
      }
      
      this.estOg = RecipeUtils.roundDecimal(((this.batchSize - (sugar / 1.59) + sugar) / this.batchSize), 3)
      this.estColor = RecipeUtils.roundDecimal(color, 1)
      this.updateFg()
    }
 }

  /**
   * Met à jour la densité finale estimée
   */
  updateFg(): void {
    let attenuation = 0
    
    if (this.yeasts.length !== 0) {
      for (const yeast of this.yeasts) {
        if (yeast.attenuation && yeast.attenuation > attenuation) {
          attenuation = yeast.attenuation
        }
      }
    } else {
      attenuation = 75
    }
    
    this.estFg = RecipeUtils.roundDecimal((((this.getEstOg() - 1) * (1 - (attenuation / 100))) + 1), 3)
    this.setCalories()
  }

  /**
   * Met à jour l'IBU (amertume) de la recette
   */
 updateIbu(): void {
    if (this.hops.length !== 0) {
      let bitterness = 0
      
      for (const hop of this.hops) {
        bitterness += hop.getBitterness(this.ibuMethod.toLowerCase(), this.getEstOg(), this.getBatchSize())
      }
      
      this.setIbu(RecipeUtils.roundDecimal(bitterness, 1))
    }
 }

  /**
   * Calcule les calories de la bière
   */
  setCalories(): void {
    const ogPlato = RecipeUtils.sgToPlato(this.getEstOg())
    const fgPlato = RecipeUtils.sgToPlato(this.getEstFg())
    const realExtract = (0.1808 * ogPlato) + (0.8192 * fgPlato)
    const abw = (ogPlato - realExtract) / (2.0665 - (0.01065 * ogPlato))
    let temp = ((6.9 * abw) + 4 * (realExtract - 0.1)) * this.getFg() * 3.55
    
    if (temp < 0) temp = 0
    this.calories = temp * (1 / RecipeUtils.onceToLiter(12)) // 12 once = 0.354L
 }

  /**
   * Trie les fermentescibles par quantité
   */
  fermentableSort(a: Fermentable, b: Fermentable): number {
    if (a.amount < b.amount) return 1
    if (a.amount > b.amount) return -1
    return 0
 }

  /**
   * Trie les houblons par temps d'ajout
   */
  hopSort(a: Hop, b: Hop): number {
    if (a.time === b.time) {
      if (a.use === b.use) {
        return (a.amount > b.amount) ? -1 : (a.amount < b.amount) ? 1 : 0
      } else {
        return (a.use > b.use) ? -1 : 1
      }
    } else {
      return (a.time > b.time) ? -1 : 1
    }
  }

  /**
   * Trie les levures par atténuation
   */
  yeastSort(a: Yeast, b: Yeast): number {
    if (a.attenuation < b.attenuation) return 1
    if (a.attenuation > b.attenuation) return -1
    return 0
  }

 /**
   * Ajoute un ingrédient à la recette
   * @param type - Type d'ingrédient à ajouter
   * @param options - Options de l'ingrédient
   */
  add(type: string, options: Partial<IRecipeIngredient>): number {
    let ret: number
    let updateFunc: (() => void) | undefined
    
    switch (type) {
      case 'fermentable':
        ret = this.fermentables.push(new Fermentable({ ...options, parent: this }))
        updateFunc = this.updateOg.bind(this)
        break
      case 'hop':
        ret = this.hops.push(new Hop({ ...options, parent: this }))
        updateFunc = this.updateIbu.bind(this)
        break
      case 'yeast':
        ret = this.yeasts.push(new Yeast(options))
        updateFunc = this.updateFg.bind(this)
        break
      case 'misc':
        ret = this.miscs.push(new Misc(options))
        break
      case 'water':
        ret = this.waters.push(new Water(options))
        break
      default:
        throw new Error(`Type d'ingrédient inconnu: ${type}`)
    }
    
    if (updateFunc) updateFunc()
    return ret
  }

  /**
   * Supprime un ingrédient de la recette
   * @param type - Type d'ingrédient à supprimer
   * @param ingredient - Instance de l'ingrédient à supprimer
   */
  remove(type: string, ingredient: IRecipeIngredient): void {
    let lists: IRecipeIngredient[]
    let updateFunc: (() => void) | undefined
    
    switch (type) {
      case 'fermentable':
        lists = this.fermentables as IRecipeIngredient[]
        updateFunc = this.updateOg.bind(this)
        break
      case 'hop':
        lists = this.hops as IRecipeIngredient[]
        updateFunc = this.updateIbu.bind(this)
        break
      case 'yeast':
        lists = this.yeasts as IRecipeIngredient[]
        updateFunc = this.updateFg.bind(this)
        break
      case 'misc':
        lists = this.miscs as IRecipeIngredient[]
        break
      case 'water':
        lists = this.waters as IRecipeIngredient[]
        break
      default:
        throw new Error(`Type d'ingrédient inconnu: ${type}`)
    }
    
    const index = lists.findIndex(item => 
      JSON.stringify(item) === JSON.stringify(ingredient)
    )
    
    if (index !== -1) {
      lists.splice(index, 1)
    }
    
    if (updateFunc) updateFunc()
  }

  /**
   * Convertit la recette en objet JSON
   */
  toJSON(): Partial<IRecipe> {
    return {
      name: this.name,
      notes: this.notes,
      brewer: this.brewer,
      type: this.type,
      equipment: this.equipment,
      style: this.style,
      batchSize: this.batchSize,
      boilSize: this.boilSize,
      boilTime: this.boilTime,
      efficiency: this.efficiency,
      fermentables: this.fermentables,
      yeasts: this.yeasts,
      hops: this.hops,
      miscs: this.miscs,
      waters: this.waters,
      mash: this.mash,
      fermentation: this.fermentation,
      carbonation: this.carbonation,
      og: this.og,
      fg: this.fg,
      tasteNote: this.tasteNote,
      tasteRating: this.tasteRating,
      date: this.date,
      estOg: this.estOg,
      estFg: this.estFg,
      estColor: this.estColor,
      ibu: this.ibu,
      estAbv: this.estAbv,
      abv: this.abv,
      actualEfficiency: this.actualEfficiency,
      calories: this.calories
    }
  }
}