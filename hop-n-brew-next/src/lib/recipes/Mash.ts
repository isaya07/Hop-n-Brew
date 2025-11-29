import { IRecipe, IMash, IMashStep } from './types'
import { RecipeUtils } from './RecipeUtils'
import { Recipe } from './Recipe'

/**
 * Représente un profil d'empâtage dans une recette
 */
export class Mash implements IMash {
  name: string = ''
  grainTemp: number | null = null
  notes: string | null = null
  tunTemp: number | null = null
  spargeTemp: number | null = null
  ph: number | null = null
  tunWeight: number | null = null
  tunSpecificHeat: number | null = null
  equipmentAdjust: boolean | null = null
  displayGrainTemp: string | null = null
  displayTunTemp: string | null = null
  displaySpargeTemp: string | null = null
  displayTunWeight: string | null = null
  mashSteps: MashStep[] = []
  parent?: Recipe

  /**
   * Crée une nouvelle instance d'empâtage
   * @param options - Options de configuration de l'empâtage
   */
  constructor(options?: Partial<IMash>) {
    if (options) {
      Object.assign(this, options)
      
      // Initialiser les étapes d'empâtage
      if (options.mashSteps) {
        this.mashSteps = options.mashSteps.map(step => new MashStep(step))
      }
    }
  }

  /**
   * Récupère la liste des types d'étapes d'empâtage possibles
   */
  static getStepTypeList(): string[] {
    return ['Infusion', 'Temperature', 'Decoction', 'Fly Sparge', 'Batch Sparge']
  }

  /**
   * Récupère la température du grain avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getGrainTemp(unit: string = 'c'): number {
    if (this.displayGrainTemp) {
      return RecipeUtils.convertTo(this.displayGrainTemp, unit)
    } else if (this.grainTemp !== null) {
      return RecipeUtils.convertTo(`${this.grainTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température du grain
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setGrainTemp(val: number, unit: string = 'c'): void {
     this.grainTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
     this.displayGrainTemp = `${val} ${unit}`
   }

  /**
   * Récupère la température du massepoutre avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getTunTemp(unit: string = 'c'): number {
    if (this.displayTunTemp) {
      return RecipeUtils.convertTo(this.displayTunTemp, unit)
    } else if (this.tunTemp !== null) {
      return RecipeUtils.convertTo(`${this.tunTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température du massepoutre
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setTunTemp(val: number, unit: string = 'c'): void {
    this.tunTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
    this.displayTunTemp = `${val} ${unit}`
  }

  /**
   * Récupère la température de rinçage avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getSpargeTemp(unit: string = 'c'): number {
    if (this.displaySpargeTemp) {
      return RecipeUtils.convertTo(this.displaySpargeTemp, unit)
    } else if (this.spargeTemp !== null) {
      return RecipeUtils.convertTo(`${this.spargeTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température de rinçage
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setSpargeTemp(val: number, unit: string = 'c'): void {
    this.spargeTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
    this.displaySpargeTemp = `${val} ${unit}`
  }

  /**
   * Récupère le poids du massepoutre avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'kg')
   */
  getTunWeight(unit: string = 'kg'): number {
    if (this.displayTunWeight) {
      return RecipeUtils.convertTo(this.displayTunWeight, unit)
    } else if (this.tunWeight !== null) {
      return RecipeUtils.convertTo(`${this.tunWeight} kg`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit le poids du massepoutre
   * @param val - Valeur du poids
   * @param unit - Unité du poids (par défaut 'kg')
   */
  setTunWeight(val: number, unit: string = 'kg'): void {
    this.tunWeight = RecipeUtils.convertTo(`${val} ${unit}`, 'kg')
    this.displayTunWeight = `${val} ${unit}`
  }

  /**
   * Calcule la température d'infusion nécessaire pour atteindre une température cible
   * @param targetTemp - Température cible en °C
   * @param waterToGrainRatio - Ratio eau/grain en L/kg
   * @param boilingWaterTemp - Température de l'eau bouillante en °C (par défaut 100)
   */
  calcInfusionTemp(targetTemp: number, waterToGrainRatio: number, boilingWaterTemp: number = 100): number {
    if (
      this.grainTemp === null || 
      this.tunTemp === null || 
      this.tunSpecificHeat === null
    ) {
      return 0
    }

    // Calcul de la température d'infusion nécessaire
    const infusionTemp = (
      (targetTemp - this.grainTemp) * 
      (waterToGrainRatio + this.tunSpecificHeat) + 
      (this.tunTemp - targetTemp) * this.tunSpecificHeat
    ) / waterToGrainRatio + targetTemp

    // S'assurer que la température d'infusion ne dépasse pas la température de l'eau bouillante
    return Math.min(infusionTemp, boilingWaterTemp)
  }

  /**
   * Calcule la quantité d'eau nécessaire pour atteindre une concentration spécifique
   * @param grainWeight - Poids total des grains en kg
   * @param targetRatio - Ratio eau/grain cible
   */
  calcWaterAmount(grainWeight: number, targetRatio: number): number {
    return grainWeight * targetRatio
  }

  /**
   * Calcule le rendement théorique de l'empâtage
   * @param grainWeight - Poids total des grains en kg
   * @param waterAmount - Quantité d'eau en litres
   * @param targetTemp - Température cible en °C
   */
  calcTheoreticalEfficiency(grainWeight: number, waterAmount: number, targetTemp: number): number {
    if (this.grainTemp === null) {
      return 0
    }

    // Calculer l'énergie nécessaire pour chauffer l'eau et les grains
    const waterEnergy = waterAmount * (targetTemp - 20) * 4.184 // J
    const grainEnergy = grainWeight * 1000 * (targetTemp - this.grainTemp) * 1.5 // J (chaleur spécifique approximative du grain)
    
    // Rendement théorique basé sur l'énergie transférée
    const totalEnergy = waterEnergy + grainEnergy
    const theoreticalEfficiency = (waterEnergy / totalEnergy) * 100
    
    return Math.min(theoreticalEfficiency, 100)
  }

  /**
   * Calcule le volume de rinçage en fonction de la recette parente
   * @param unit - Unité de volume cible (par défaut 'l')
   */
  getSpargeVol(unit: string = 'l'): number {
    if (!this.parent) {
      return 0
    }

    // Récupérer les informations de la recette parente
    const boilSize = this.parent.boilSize
    const fermentablesTotal = this.parent.getFementablesTotal ? this.parent.getFementablesTotal() : this.parent.fermentables.reduce((total, fermentable) => total + (fermentable.amount || 0), 0)

    // Calcul du volume de rinçage (formule simplifiée basée sur l'ancienne implémentation)
    // Utilisation d'une absorption standard de 0.96 L/kg de grain
    const grainAbsorption = 0.96 * fermentablesTotal
    const test = boilSize - grainAbsorption * (this.getStepWaterRatio() - 1)

    return RecipeUtils.convertTo(test, unit, 2)
  }

  /**
   * Calcule le ratio eau/grain pour les étapes d'empâtage
   * @param stepName - Nom de l'étape (facultatif)
   */
  getStepWaterRatio(stepName?: string): number {
    let ratio = 0
    let stepIndex = -1

    if (stepName) {
      stepIndex = this.mashSteps.findIndex(step => step.name === stepName)
      if (stepIndex < 0) stepIndex = this.mashSteps.length - 1
    } else {
      stepIndex = this.mashSteps.length - 1
    }

    // Calcul du ratio eau/grain cumulé pour les étapes d'infusion
    for (let i = 0; i <= stepIndex; i++) {
      if (this.mashSteps[i].type !== 'Temperature' && this.mashSteps[i].infuseAmount !== null && this.mashSteps[i].amount !== null && this.mashSteps[i].amount !== 0) {
        ratio += (this.mashSteps[i].infuseAmount || 0) / (this.mashSteps[i].amount || 1)
      }
    }

    return ratio
  }

  /**
   * Ajoute une étape d'empâtage
   * @param step - Étape d'empâtage à ajouter
   */
  addStep(step: Partial<IMashStep>): number {
    const newStep = new MashStep(Object.assign({}, step))
    ;(newStep as any).parent = this
    return this.mashSteps.push(newStep)
  }

  /**
   * Supprime une étape d'empâtage
   * @param step - Étape d'empâtage à supprimer
   */
  removeStep(step: MashStep): void {
    const index = this.mashSteps.indexOf(step)
    if (index !== -1) {
      this.mashSteps.splice(index, 1)
    }
  }

  /**
   * Convertit l'empâtage en objet JSON
   */
  toJSON(): Partial<IMash> {
    return {
      name: this.name,
      grainTemp: this.grainTemp,
      notes: this.notes,
      tunTemp: this.tunTemp,
      spargeTemp: this.spargeTemp,
      ph: this.ph,
      tunWeight: this.tunWeight,
      tunSpecificHeat: this.tunSpecificHeat,
      equipmentAdjust: this.equipmentAdjust,
      displayGrainTemp: this.displayGrainTemp,
      displayTunTemp: this.displayTunTemp,
      displaySpargeTemp: this.displaySpargeTemp,
      displayTunWeight: this.displayTunWeight,
      mashSteps: this.mashSteps.map(step => {
        const stepJson = step.toJSON();
        // Assurer que toutes les propriétés obligatoires sont définies
        return {
          name: stepJson.name || '',
          type: stepJson.type || '',
          amount: stepJson.amount || null,
          stepTemp: stepJson.stepTemp || null,
          endTemp: stepJson.endTemp || null,
          stepTime: stepJson.stepTime || null,
          rampTime: stepJson.rampTime || null,
          endOfMash: stepJson.endOfMash || null,
          infuseAmount: stepJson.infuseAmount || null,
          infuseTemp: stepJson.infuseTemp || null,
          displayStepTemp: stepJson.displayStepTemp || null,
          displayEndTemp: stepJson.displayEndTemp || null,
          displayStepTime: stepJson.displayStepTime || null,
          displayRampTime: stepJson.displayRampTime || null,
          displayInfuseAmount: stepJson.displayInfuseAmount || null,
          displayInfuseTemp: stepJson.displayInfuseTemp || null,
          ...stepJson
        };
      })
    }
  }
}

/**
 * Représente une étape d'empâtage
 */
export class MashStep implements IMashStep {
  name: string = ''
  type: string = ''
  amount: number | null = null
  stepTemp: number | null = null
  endTemp: number | null = null
  stepTime: number | null = null
  rampTime: number | null = null
  endOfMash: boolean | null = null
  infuseAmount: number | null = null
  infuseTemp: number | null = null
  displayStepTemp: string | null = null
  displayEndTemp: string | null = null
  displayStepTime: string | null = null
  displayRampTime: string | null = null
  displayInfuseAmount: string | null = null
  displayInfuseTemp: string | null = null
  parent?: Mash

  /**
   * Crée une nouvelle instance d'étape d'empâtage
   * @param options - Options de configuration de l'étape
   */
  constructor(options?: Partial<IMashStep>) {
    if (options) {
      Object.assign(this, options)
    }
  }

  /**
   * Récupère la température de l'étape avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getStepTemp(unit: string = 'c'): number {
    if (this.displayStepTemp) {
      return RecipeUtils.convertTo(this.displayStepTemp, unit)
    } else if (this.stepTemp !== null) {
      return RecipeUtils.convertTo(`${this.stepTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température de l'étape
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setStepTemp(val: number, unit: string = 'c'): void {
    this.stepTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
    this.displayStepTemp = `${val} ${unit}`
  }

  /**
   * Récupère la température de fin avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getEndTemp(unit: string = 'c'): number {
    if (this.displayEndTemp) {
      return RecipeUtils.convertTo(this.displayEndTemp, unit)
    } else if (this.endTemp !== null) {
      return RecipeUtils.convertTo(`${this.endTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température de fin
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setEndTemp(val: number, unit: string = 'c'): void {
    this.endTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
    this.displayEndTemp = `${val} ${unit}`
  }

  /**
   * Récupère la durée de l'étape
   */
  getStepTime(): number {
    if (this.displayStepTime) {
      return RecipeUtils.parseDuration(this.displayStepTime)
    } else if (this.stepTime !== null) {
      return this.stepTime
    } else {
      return 0
    }
  }

  /**
   * Définit la durée de l'étape
   * @param val - Valeur de la durée
   * @param unit - Unité de la durée (optionnelle)
   */
  setStepTime(val: number, unit?: string): void {
    if (unit) {
      this.stepTime = RecipeUtils.parseDuration(`${val} ${unit}`)
      this.displayStepTime = `${val} ${unit}`
    } else {
      this.stepTime = val
      this.displayStepTime = `${val} min`
    }
  }

  /**
   * Récupère la durée de montée en température
   */
  getRampTime(): number {
    if (this.displayRampTime) {
      return RecipeUtils.parseDuration(this.displayRampTime)
    } else if (this.rampTime !== null) {
      return this.rampTime
    } else {
      return 0
    }
  }

  /**
   * Définit la durée de montée en température
   * @param val - Valeur de la durée
   * @param unit - Unité de la durée (optionnelle)
   */
  setRampTime(val: number, unit?: string): void {
    if (unit) {
      this.rampTime = RecipeUtils.parseDuration(`${val} ${unit}`)
      this.displayRampTime = `${val} ${unit}`
    } else {
      this.rampTime = val
      this.displayRampTime = `${val} min`
    }
  }

  /**
   * Récupère la quantité d'infusion avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'l')
   */
  getInfuseAmount(unit: string = 'l'): number {
    if (this.displayInfuseAmount) {
      return RecipeUtils.convertTo(this.displayInfuseAmount, unit)
    } else if (this.infuseAmount !== null) {
      return RecipeUtils.convertTo(`${this.infuseAmount} l`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la quantité d'infusion
   * @param val - Valeur de la quantité
   * @param unit - Unité de la quantité (par défaut 'l')
   */
  setInfuseAmount(val: number, unit: string = 'l'): void {
    this.infuseAmount = RecipeUtils.convertTo(`${val} ${unit}`, 'l')
    this.displayInfuseAmount = `${val} ${unit}`
  }

  /**
   * Récupère la température d'infusion avec conversion d'unité optionnelle
   * @param unit - Unité cible (par défaut 'c')
   */
  getInfuseTemp(unit: string = 'c'): number {
    if (this.displayInfuseTemp) {
      return RecipeUtils.convertTo(this.displayInfuseTemp, unit)
    } else if (this.infuseTemp !== null) {
      return RecipeUtils.convertTo(`${this.infuseTemp} c`, unit)
    } else {
      return 0
    }
  }

  /**
   * Définit la température d'infusion
   * @param val - Valeur de la température
   * @param unit - Unité de la température (par défaut 'c')
   */
  setInfuseTemp(val: number, unit: string = 'c'): void {
    this.infuseTemp = RecipeUtils.convertTo(`${val} ${unit}`, 'c')
    this.displayInfuseTemp = `${val} ${unit}`
  }

  /**
   * Convertit l'étape d'empâtage en objet JSON
   */
  toJSON(): Partial<IMashStep> {
    return {
      name: this.name,
      type: this.type,
      amount: this.amount,
      stepTemp: this.stepTemp,
      endTemp: this.endTemp,
      stepTime: this.stepTime,
      rampTime: this.rampTime,
      endOfMash: this.endOfMash,
      infuseAmount: this.infuseAmount,
      infuseTemp: this.infuseTemp,
      displayStepTemp: this.displayStepTemp,
      displayEndTemp: this.displayEndTemp,
      displayStepTime: this.displayStepTime,
      displayRampTime: this.displayRampTime,
      displayInfuseAmount: this.displayInfuseAmount,
      displayInfuseTemp: this.displayInfuseTemp
    }
  }
}