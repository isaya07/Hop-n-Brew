/**
 * @file MashProfile.ts
 * @description Classe représentant un profil de brassage (ensemble d'étapes de brassage)
 */

import { MashStep, IMashStep } from './MashStep';

export interface IMashProfile {
  id?: string;
  name: string;
  description?: string;
  grainTemp: number; // Température des grains en °C
  tunTemp: number; // Température de la cuve en °C
  spargeTemp: number; // Température de l'eau de rinçage en °C
  spargePh: number; // pH de l'eau de rinçage
 notes?: string; // Notes sur le profil de brassage
  mashSteps: MashStep[]; // Étapes du brassage
  equipAdjust?: boolean; // Ajustement de température pour l'équipement
  phAdjust?: boolean; // Ajustement de pH
}

export class MashProfile implements IMashProfile {
  id?: string;
  name: string;
  description?: string;
  grainTemp: number;
  tunTemp: number;
  spargeTemp: number;
  spargePh: number;
  notes?: string;
  mashSteps: MashStep[];
  equipAdjust?: boolean;
  phAdjust?: boolean;

  constructor(data?: Partial<IMashProfile>) {
    this.id = data?.id;
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.grainTemp = data?.grainTemp || 20; // Température ambiante par défaut
    this.tunTemp = data?.tunTemp || 20; // Température ambiante par défaut
    this.spargeTemp = data?.spargeTemp || 75; // Température de rinçage par défaut
    this.spargePh = data?.spargePh || 5.2; // pH neutre par défaut
    this.notes = data?.notes;
    this.mashSteps = data?.mashSteps ? data.mashSteps.map(step => new MashStep(step)) : [];
    this.equipAdjust = data?.equipAdjust || false;
    this.phAdjust = data?.phAdjust || false;
  }

  /**
   * Ajoute une étape de brassage au profil
   */
  addStep(step: MashStep): void {
    // Déterminer l'ordre de la nouvelle étape
    const order = this.mashSteps.length > 0 
      ? Math.max(...this.mashSteps.map(s => s.order)) + 1 
      : 0;
    
    step.order = order;
    this.mashSteps.push(step);
    this.sortSteps();
  }

  /**
   * Supprime une étape de brassage du profil
   */
  removeStep(stepId: string): void {
    this.mashSteps = this.mashSteps.filter(step => step.id !== stepId);
    this.sortSteps();
  }

  /**
   * Met à jour une étape de brassage existante
   */
  updateStep(updatedStep: MashStep): void {
    const index = this.mashSteps.findIndex(step => step.id === updatedStep.id);
    if (index !== -1) {
      this.mashSteps[index] = updatedStep;
      this.sortSteps();
    }
  }

  /**
   * Trie les étapes par ordre
   */
  sortSteps(): void {
    this.mashSteps.sort((a, b) => a.order - b.order);
  }

  /**
   * Calcule le volume d'eau de rinçage nécessaire
   * @param grainWeight Poids des grains en kg
   * @param waterToGrainRatio Ratio eau/grain en L/kg (généralement entre 3 et 4)
   * @returns Volume d'eau de rinçage en litres
   */
  getSpargeVolume(grainWeight: number, waterToGrainRatio: number = 3.5): number {
    // Calcul simplifié du volume d'eau de rinçage
    // Formule : Volume de rinçage = (Ratio eau-grain * Poids des grains) - Volume de la première eau
    const firstWaterVolume = grainWeight * waterToGrainRatio;
    
    // En général, le volume de rinçage est environ égal au volume de la première eau
    // mais peut être ajusté en fonction de l'efficacité du brassage
    return firstWaterVolume;
  }

  /**
   * Calcule la température d'eau nécessaire pour atteindre une température d'étape
   * @param currentTemp Température actuelle du moût
   * @param targetTemp Température cible de l'étape
   * @param waterAmount Volume d'eau à ajouter en litres
   * @param grainWeight Poids des grains en kg
   * @returns Température de l'eau à ajouter
   */
  calculateWaterAdditionTemp(
    currentTemp: number, 
    targetTemp: number, 
    waterAmount: number, 
    grainWeight: number
 ): number {
    // Formule de calcul de température d'eau à ajouter
    // Tw = (Tf * (Vw + 0.4 * G)) - (Ti * Vw)) / Vw
    // Où: Tw=température eau, Tf=température finale, Vw=volume eau, G=poids grain, Ti=température initiale
    const factor = 0.4; // Facteur de capacité thermique des grains
    const result = ((targetTemp * (waterAmount + factor * grainWeight)) - (currentTemp * waterAmount)) / waterAmount;
    
    return result > 100 ? 100 : result; // Limiter à 100°C
  }

  /**
   * Convertit l'objet MashProfile en objet brut
   */
  toObject(): IMashProfile {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      grainTemp: this.grainTemp,
      tunTemp: this.tunTemp,
      spargeTemp: this.spargeTemp,
      spargePh: this.spargePh,
      notes: this.notes,
      mashSteps: this.mashSteps.map(step => {
        const obj = step.toObject();
        // Supprimer la méthode toObject de l'objet retourné pour correspondre à IMashStep
        const { toObject, ...stepObj } = obj as any;
        return stepObj;
      }),
      equipAdjust: this.equipAdjust,
      phAdjust: this.phAdjust
    };
  }

  /**
   * Crée un MashProfile à partir d'un objet brut
   */
  static fromObject(data: Partial<IMashProfile>): MashProfile {
    return new MashProfile(data);
 }
}