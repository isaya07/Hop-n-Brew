/**
 * @file MashStep.ts
 * @description Classe représentant une étape de brassage
 */

export interface IMashStep {
  id?: string;
  name: string;
 description?: string;
 stepTemp: number; // Température de l'étape en °C
  stepTime: number; // Durée de l'étape en minutes
  rampTime?: number; // Temps de rampe en minutes
  endTemp?: number; // Température finale en °C
  type: string; // Type d'étape (infusion, température, etc.)
  order: number; // Ordre de l'étape dans le processus
  waterRatio?: number; // Ratio eau/grain en L/kg
  descriptionStep?: string; // Description détaillée de l'étape
}

export class MashStep implements IMashStep {
  id?: string;
  name: string;
 description?: string;
  stepTemp: number;
  stepTime: number;
 rampTime?: number = 0;
  endTemp?: number;
  type: string;
  order: number;
  waterRatio?: number;
  descriptionStep?: string;

  constructor(data?: Partial<IMashStep>) {
    this.id = data?.id;
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.stepTemp = data?.stepTemp || 0;
    this.stepTime = data?.stepTime || 0;
    this.rampTime = data?.rampTime || 0;
    this.endTemp = data?.endTemp;
    this.type = data?.type || 'Infusion';
    this.order = data?.order || 0;
    this.waterRatio = data?.waterRatio;
    this.descriptionStep = data?.descriptionStep;
  }

  /**
   * Convertit l'objet MashStep en objet brut
   */
 toObject(): IMashStep {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      stepTemp: this.stepTemp,
      stepTime: this.stepTime,
      rampTime: this.rampTime,
      endTemp: this.endTemp,
      type: this.type,
      order: this.order,
      waterRatio: this.waterRatio,
      descriptionStep: this.descriptionStep
    };
  }

  /**
   * Crée un MashStep à partir d'un objet brut
   */
  static fromObject(data: Partial<IMashStep>): MashStep {
    return new MashStep(data);
  }
}