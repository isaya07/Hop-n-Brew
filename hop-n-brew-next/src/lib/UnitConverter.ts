/**
 * Convertisseur d'unités avancé pour les calculs de brassage
 * Permet de convertir entre différentes unités de mesure utilisées en brassage
 */
export class UnitConverter {
  // Type pour les facteurs de conversion (nombre ou fonction)
  private static conversionTable: Map<string, Map<string, number | ((value: number) => number)>> = new Map();

  /**
   * Initialise la table de conversion avec les facteurs de conversion
   */
  static initializeConversionTable(): void {
    // Poids
    this.setConversionFactor('kg', 'g', 1000);
    this.setConversionFactor('kg', 'lb', 2.20462);
    this.setConversionFactor('kg', 'oz', 35.274);
    
    this.setConversionFactor('g', 'kg', 0.001);
    this.setConversionFactor('g', 'lb', 0.00220462);
    this.setConversionFactor('g', 'oz', 0.035274);
    
    this.setConversionFactor('lb', 'kg', 0.453592);
    this.setConversionFactor('lb', 'g', 453.592);
    this.setConversionFactor('lb', 'oz', 16);
    
    this.setConversionFactor('oz', 'kg', 0.0283495);
    this.setConversionFactor('oz', 'g', 28.3495);
    this.setConversionFactor('oz', 'lb', 0.0625);
    
    // Volume
    this.setConversionFactor('l', 'ml', 1000);
    this.setConversionFactor('l', 'gal', 0.264172);
    this.setConversionFactor('l', 'qt', 1.05669);
    this.setConversionFactor('l', 'pt', 2.11338);
    this.setConversionFactor('l', 'fl-oz', 33.814);
    this.setConversionFactor('l', 'cup', 4.16667);
    this.setConversionFactor('l', 'tbsp', 67.628);
    this.setConversionFactor('l', 'tsp', 202.884);
    
    this.setConversionFactor('ml', 'l', 0.001);
    this.setConversionFactor('ml', 'gal', 0.000264172);
    this.setConversionFactor('ml', 'qt', 0.00105669);
    this.setConversionFactor('ml', 'pt', 0.00211338);
    this.setConversionFactor('ml', 'fl-oz', 0.033814);
    this.setConversionFactor('ml', 'cup', 0.00416667);
    this.setConversionFactor('ml', 'tbsp', 0.067628);
    this.setConversionFactor('ml', 'tsp', 0.202884);
    
    this.setConversionFactor('gal', 'l', 3.78541);
    this.setConversionFactor('gal', 'ml', 3785.41);
    this.setConversionFactor('gal', 'qt', 4);
    this.setConversionFactor('gal', 'pt', 8);
    this.setConversionFactor('gal', 'fl-oz', 128);
    this.setConversionFactor('gal', 'cup', 16);
    this.setConversionFactor('gal', 'tbsp', 256);
    this.setConversionFactor('gal', 'tsp', 768);
    
    this.setConversionFactor('qt', 'l', 0.946353);
    this.setConversionFactor('qt', 'ml', 946.353);
    this.setConversionFactor('qt', 'gal', 0.25);
    this.setConversionFactor('qt', 'pt', 2);
    this.setConversionFactor('qt', 'fl-oz', 32);
    this.setConversionFactor('qt', 'cup', 4);
    this.setConversionFactor('qt', 'tbsp', 64);
    this.setConversionFactor('qt', 'tsp', 192);
    
    this.setConversionFactor('pt', 'l', 0.473176);
    this.setConversionFactor('pt', 'ml', 473.176);
    this.setConversionFactor('pt', 'gal', 0.125);
    this.setConversionFactor('pt', 'qt', 0.5);
    this.setConversionFactor('pt', 'fl-oz', 16);
    this.setConversionFactor('pt', 'cup', 2);
    this.setConversionFactor('pt', 'tbsp', 32);
    this.setConversionFactor('pt', 'tsp', 96);
    
    this.setConversionFactor('fl-oz', 'l', 0.0295735);
    this.setConversionFactor('fl-oz', 'ml', 29.5735);
    this.setConversionFactor('fl-oz', 'gal', 0.0078125);
    this.setConversionFactor('fl-oz', 'qt', 0.03125);
    this.setConversionFactor('fl-oz', 'pt', 0.0625);
    this.setConversionFactor('fl-oz', 'cup', 0.125);
    this.setConversionFactor('fl-oz', 'tbsp', 2);
    this.setConversionFactor('fl-oz', 'tsp', 6);
    
    this.setConversionFactor('cup', 'l', 0.24);
    this.setConversionFactor('cup', 'ml', 240);
    this.setConversionFactor('cup', 'gal', 0.0625);
    this.setConversionFactor('cup', 'qt', 0.25);
    this.setConversionFactor('cup', 'pt', 0.5);
    this.setConversionFactor('cup', 'fl-oz', 8);
    this.setConversionFactor('cup', 'tbsp', 16);
    this.setConversionFactor('cup', 'tsp', 48);
    
    this.setConversionFactor('tbsp', 'l', 0.0147868);
    this.setConversionFactor('tbsp', 'ml', 14.7868);
    this.setConversionFactor('tbsp', 'gal', 0.00390625);
    this.setConversionFactor('tbsp', 'qt', 0.015625);
    this.setConversionFactor('tbsp', 'pt', 0.03125);
    this.setConversionFactor('tbsp', 'fl-oz', 0.5);
    this.setConversionFactor('tbsp', 'cup', 0.0625);
    this.setConversionFactor('tbsp', 'tsp', 3);
    
    this.setConversionFactor('tsp', 'l', 0.00492892);
    this.setConversionFactor('tsp', 'ml', 4.92892);
    this.setConversionFactor('tsp', 'gal', 0.00130208);
    this.setConversionFactor('tsp', 'qt', 0.00520833);
    this.setConversionFactor('tsp', 'pt', 0.0104167);
    this.setConversionFactor('tsp', 'fl-oz', 0.166667);
    this.setConversionFactor('tsp', 'cup', 0.0208333);
    this.setConversionFactor('tsp', 'tbsp', 0.333333);
    
    // Température
    // Note: Les conversions de température sont gérées séparément car elles nécessitent des formules
    
    // Densité
    this.setConversionFactor('sg', 'plato', (value: number) => (-1 * 616.868) + (1111.14 * value) - (630.272 * Math.pow(value, 2)) + (135.997 * Math.pow(value, 3)));
    this.setConversionFactor('plato', 'sg', (value: number) => 1 + (value / (258.6 - ((value / 258.2) * 227.1))));
    
    // Couleur
    this.setConversionFactor('srm', 'ebc', 1.97);
    this.setConversionFactor('ebc', 'srm', 0.508);
    this.setConversionFactor('srm', 'lovibond', (value: number) => (value + 0.76) / 1.3546);
    this.setConversionFactor('lovibond', 'srm', (value: number) => 1.3546 * value - 0.76);
    
    // Pression
    this.setConversionFactor('bar', 'psi', 14.5038);
    this.setConversionFactor('bar', 'kpa', 100);
    this.setConversionFactor('psi', 'bar', 0.0689476);
    this.setConversionFactor('psi', 'kpa', 6.89476);
    this.setConversionFactor('kpa', 'bar', 0.01);
    this.setConversionFactor('kpa', 'psi', 0.145038);
  }

  /**
   * Définit un facteur de conversion entre deux unités
   * @param fromUnit Unité de départ
   * @param toUnit Unité d'arrivée
   * @param factor Facteur de conversion ou fonction de conversion
   */
  static setConversionFactor(fromUnit: string, toUnit: string, factor: number | ((value: number) => number)): void {
    if (!this.conversionTable.has(fromUnit)) {
      this.conversionTable.set(fromUnit, new Map());
    }
    
    const unitMap = this.conversionTable.get(fromUnit)!;
    unitMap.set(toUnit, factor);
  }

  /**
   * Convertit une valeur d'une unité à une autre
   * @param value Valeur à convertir
   * @param fromUnit Unité de départ
   * @param toUnit Unité d'arrivée
   * @returns Valeur convertie
   */
  static convertValue(value: number, fromUnit: string, toUnit: string): number | null {
    // Si les unités sont identiques, retourner la valeur telle quelle
    if (fromUnit === toUnit) {
      return value;
    }
    
    // Vérifier si une conversion directe existe
    if (this.conversionTable.has(fromUnit)) {
      const unitMap = this.conversionTable.get(fromUnit)!;
      if (unitMap.has(toUnit)) {
        const factor = unitMap.get(toUnit)!;
        if (typeof factor === 'function') {
          return factor(value);
        } else {
          return value * factor;
        }
      }
    }
    
    // Si aucune conversion directe n'existe, essayer de trouver un chemin indirect
    // Par exemple, convertir de A à B puis de B à C
    for (const [intermediateUnit, _] of this.conversionTable.entries()) {
      if (this.canConvert(fromUnit, intermediateUnit) && this.canConvert(intermediateUnit, toUnit)) {
        const intermediateValue = this.convertValue(value, fromUnit, intermediateUnit);
        if (intermediateValue !== null) {
          const finalValue = this.convertValue(intermediateValue, intermediateUnit, toUnit);
          if (finalValue !== null) {
            return finalValue;
          }
        }
      }
    }
    
    // Si aucune conversion n'est possible, retourner null
    return null;
  }

  /**
   * Vérifie si une conversion est possible entre deux unités
   * @param fromUnit Unité de départ
   * @param toUnit Unité d'arrivée
   * @returns Vrai si la conversion est possible, faux sinon
   */
  static canConvert(fromUnit: string, toUnit: string): boolean {
    // Si les unités sont identiques, la conversion est possible
    if (fromUnit === toUnit) {
      return true;
    }
    
    // Vérifier si une conversion directe existe
    if (this.conversionTable.has(fromUnit)) {
      const unitMap = this.conversionTable.get(fromUnit)!;
      return unitMap.has(toUnit);
    }
    
    return false;
  }

  /**
   * Convertit une température d'une unité à une autre
   * @param value Valeur à convertir
   * @param fromUnit Unité de départ ('c' pour Celsius, 'f' pour Fahrenheit)
   * @param toUnit Unité d'arrivée ('c' pour Celsius, 'f' pour Fahrenheit)
   * @returns Valeur convertie
   */
  static convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    // Si les unités sont identiques, retourner la valeur telle quelle
    if (fromUnit === toUnit) {
      return value;
    }
    
    // Convertir de Celsius à Fahrenheit
    if (fromUnit === 'c' && toUnit === 'f') {
      return (value * 9/5) + 32;
    }
    
    // Convertir de Fahrenheit à Celsius
    if (fromUnit === 'f' && toUnit === 'c') {
      return (value - 32) * 5/9;
    }
    
    // Si les unités ne sont pas reconnues, retourner la valeur telle quelle
    return value;
  }

  /**
   * Convertit une couleur d'une unité à une autre
   * @param value Valeur à convertir
   * @param fromUnit Unité de départ ('srm', 'ebc', 'lovibond')
   * @param toUnit Unité d'arrivée ('srm', 'ebc', 'lovibond')
   * @returns Valeur convertie
   */
  static convertColor(value: number, fromUnit: string, toUnit: string): number | null {
    return this.convertValue(value, fromUnit, toUnit);
  }

  /**
   * Convertit une densité d'une unité à une autre
   * @param value Valeur à convertir
   * @param fromUnit Unité de départ ('sg', 'plato')
   * @param toUnit Unité d'arrivée ('sg', 'plato')
   * @returns Valeur convertie
   */
  static convertDensity(value: number, fromUnit: string, toUnit: string): number | null {
    return this.convertValue(value, fromUnit, toUnit);
  }
}

// Initialiser la table de conversion au chargement du module
UnitConverter.initializeConversionTable();