import Utils from '@/lib/utils';

/**
 * Calculateur de brassage pour les recettes de bière
 * Basé sur les calculs existants du projet original
 */
export class BrewCalculator {
  /**
   * Calcule la densité initiale (OG) en fonction des ingrédients
   * @param fermentables Liste des fermentables avec leur poids et rendement
   * @param batchSize Volume total de moût en litres
   * @param efficiency Efficacité du brassage (0-100)
   * @returns Densité initiale en SG (Specific Gravity)
   */
  static calculateOriginalGravity(fermentables: Array<{weight: number, yield: number}>, batchSize: number, efficiency: number = 75): number {
    if (batchSize <= 0) return 1.000;
    
    // Calcul du potentiel total de sucre
    let sugar = 0;
    for (let i = 0; i < fermentables.length; i++) {
      // Adaptation de la formule originale : sugar += this.fermentables[i].calcSugar(this.efficiency)
      // Pour un fermentable : (weight * yield * efficiency / 100) / 10
      const fermentable = fermentables[i];
      // Conversion du rendement en points de densité
      const potential = (fermentable.yield * efficiency / 100);
      sugar += (fermentable.weight * 100 * potential) / 1000; // Simplifié pour l'explication
    }
    
    // Formule simplifiée : (poids * rendement * efficacité) / volume
    const totalPoints = sugar * efficiency / 100;
    return 1 + (totalPoints / batchSize / 10);
  }

  /**
   * Calcule la densité finale (FG) en fonction de l'atténuation
   * @param og Densité initiale
   * @param attenuation Pourcentage d'atténuation (0-100)
   * @returns Densité finale en SG
   */
  static calculateFinalGravity(og: number, attenuation: number): number {
    const fg = og - ((og - 1) * (attenuation / 100));
    return Math.max(fg, 1.000); // La densité finale ne peut pas être inférieure à 1.000
  }

  /**
   * Calcule le taux d'alcool par volume (ABV)
   * @param og Densité initiale
   * @param fg Densité finale
   * @returns Pourcentage d'alcool par volume
   */
  static calculateABV(og: number, fg: number): number {
    // Utilisation de la formule originale : 76.08 * (og - fg) / (1.775 - og) * (fg / 0.794)
    return Utils.roundDecimal((76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794), 1);
  }

  /**
   * Calcule l'IBU (International Bitterness Units) 
   * @param hops Liste des houblons avec leur alpha-acide, poids et temps d'ébullition
   * @param og Densité initiale
   * @param batchSize Volume total en litres
   * @param ibuMethod Méthode de calcul (Tinseth, Rager, etc.)
   * @returns IBU
   */
  static calculateIBU(hops: Array<{alphaAcid: number, weight: number, boilTime: number, form?: string}>, og: number, batchSize: number, ibuMethod: string = 'Tinseth'): number {
    if (batchSize <= 0) return 0;
    
    let bitterness = 0;
    
    if (ibuMethod.toLowerCase() === 'tinseth') {
      // Formule de Tinseth originale
      for (let i = 0; i < hops.length; i++) {
        const hop = hops[i];
        const utilization = this.calculateTinsethUtilization(hop.boilTime, og);
        const decimalAA = hop.alphaAcid / 100;
        const milligramsOfAA = hop.weight * 100 * decimalAA;
        
        bitterness += (utilization * milligramsOfAA) / batchSize;
      }
    } else if (ibuMethod.toLowerCase() === 'rager') {
      // Formule de Rager (simplifiée)
      for (let i = 0; i < hops.length; i++) {
        const hop = hops[i];
        const utilization = this.calculateRagerUtilization(hop.boilTime);
        const decimalAA = hop.alphaAcid / 100;
        const milligramsOfAA = hop.weight * 100 * decimalAA;
        const adjustment = Math.max(0, (og - 1.050) / 0.2);
        
        bitterness += (utilization * milligramsOfAA) / batchSize / (1 + adjustment);
      }
    }
    
    return Math.max(bitterness, 0);
  }

 /**
   * Calcule l'utilisation du houblon selon la formule de Tinseth
   * @param boilTime Temps d'ébullition en minutes
   * @param og Densité initiale
   * @returns Utilisation en pourcentage
   */
  private static calculateTinsethUtilization(boilTime: number, og: number): number {
    const bignessFactor = 1.65 * Math.pow(0.000125, og - 1);
    const boilTimeFactor = (1 - Math.exp(-0.04 * boilTime)) / 4.15;
    
    return bignessFactor * boilTimeFactor * 100;
  }

 /**
   * Calcule l'utilisation du houblon selon la formule de Rager
   * @param boilTime Temps d'ébullition en minutes
   * @returns Utilisation en pourcentage
   */
  private static calculateRagerUtilization(boilTime: number): number {
    if (boilTime < 0) return 0;
    if (boilTime < 10) return 0.15 * (boilTime / 10);
    if (boilTime < 15) return 0.15 + 0.03 * ((boilTime - 10) / 5);
    if (boilTime < 20) return 0.18 + 0.02 * ((boilTime - 15) / 5);
    if (boilTime < 30) return 0.20 + 0.05 * ((boilTime - 20) / 10);
    if (boilTime < 40) return 0.25 + 0.05 * ((boilTime - 30) / 10);
    if (boilTime < 50) return 0.30 + 0.05 * ((boilTime - 40) / 10);
    return 0.35 + 0.05 * Math.min(1, (boilTime - 50) / 10);
  }

  /**
   * Calcule la couleur en SRM
   * @param fermentables Liste des fermentables avec leur poids et couleur
   * @param batchSize Volume total en litres
   * @returns Couleur en SRM
   */
  static calculateColor(fermentables: Array<{weight: number, color: number}>, batchSize: number): number {
    if (batchSize <= 0) return 0;
    
    // Calcul de la contribution de chaque fermentable à la couleur
    let color = 0;
    for (let i = 0; i < fermentables.length; i++) {
      const fermentable = fermentables[i];
      // Formule originale : color += this.fermentables[i].calcColor(this.batchSize)
      // MCUs = (poids en lbs * couleur en Lovibond) / volume en gallons
      const weightInLbs = fermentable.weight * 2.20462;
      const volumeInGallons = batchSize * 0.264172;
      color += (weightInLbs * fermentable.color) / volumeInGallons;
    }
    
    // Conversion MCUs en SRM avec la formule de Morey
    return 1.492 * Math.pow(color, 0.6859);
 }

  /**
   * Calcule l'efficacité du brassage
   * @param actualOG Densité initiale réelle mesurée
   * @param expectedOG Densité initiale prévue
   * @returns Efficacité en pourcentage
   */
  static calculateEfficiency(actualOG: number, expectedOG: number): number {
    if (expectedOG <= 1.000) return 0;
    return Math.min(((actualOG - 1) / (expectedOG - 1)) * 100, 100);
  }

  /**
   * Calcule les calories pour 12 oz (355 ml) de bière
   * @param og Densité initiale
   * @param fg Densité finale
   * @returns Calories pour 12 oz
   */
  static calculateCalories(og: number, fg: number): number {
    const ogPlato = Utils.sgToPlato(og);
    const fgPlato = Utils.sgToPlato(fg);
    const realExtract = (0.1808 * ogPlato) + (0.8192 * fgPlato);
    const abw = (ogPlato - realExtract) / (2.0665 - (0.010665 * ogPlato));
    let calories = ((6.9 * abw) + 4 * (realExtract - 0.1)) * fg * 3.55;
    
    if (calories < 0) calories = 0;
    return calories * (1 / Utils.onceToLiter(12)); // 12 oz = 0.354L
 }
}