/**
 * Fonctions utilitaires pour les calculs de brassage
 * Basé sur les utilitaires existants du projet original
 */
export default class Utils {
  /**
   * Arrondit un nombre à une précision donnée
   * @param nombre Le nombre à arrondir
   * @param precision La précision (nombre de décimales)
   * @returns Le nombre arrondi
   */
 static roundDecimal(nombre: number, precision: number = 2): number {
    const tmp = Math.pow(10, precision);
    return Math.round(nombre * tmp) / tmp;
  }

 /**
   * Convertit une densité spécifique (SG) en degrés Plato
   * @param sg Densité spécifique
   * @returns Degrés Plato
   */
  static sgToPlato(sg: number): number {
    return (-1 * 616.868) + (111.14 * sg) - (630.272 * Math.pow(sg, 2)) + (135.997 * Math.pow(sg, 3));
  }

  /**
   * Convertit des degrés Plato en densité spécifique (SG)
   * @param plato Degrés Plato
   * @returns Densité spécifique
   */
  static platoToSg(plato: number): number {
    return 1 + (plato / (258.6 - ((plato / 258.2) * 227.1)));
  }

  /**
   * Convertit des unités de volume d'onces en litres
   * @param once Volume en onces
   * @returns Volume en litres
   */
  static onceToLiter(once: number): number {
    return once / 33.814;
  }

  /**
   * Convertit des unités de température Celsius en Fahrenheit
   * @param celsius Température en Celsius
   * @returns Température en Fahrenheit
   */
  static cToF(celsius: number): number {
    return celsius * 1.8 + 32;
  }

  /**
   * Convertit des unités de température Fahrenheit en Celsius
   * @param fahrenheit Température en Fahrenheit
   * @returns Température en Celsius
   */
  static fToC(fahrenheit: number): number {
    return (fahrenheit - 32) / 1.8;
  }

 /**
   * Convertit un rendement en pourcentage en points par livre par gallon (PPG)
   * @param yieldPercentage Rendement en pourcentage
   * @returns Points par livre par gallon
   */
  static yieldToPpg(yieldPercentage: number): number {
    return yieldPercentage * 0.46214;
  }

 /**
   * Convertit des points par livre par gallon (PPG) en rendement en pourcentage
   * @param ppg Points par livre par gallon
   * @returns Rendement en pourcentage
   */
  static ppgToYield(ppg: number): number {
    return ppg * 2.16385;
  }

  /**
   * Convertit des unités de poids de kilogrammes en livres
   * @param kg Poids en kilogrammes
   * @returns Poids en livres
   */
  static kgToLb(kg: number): number {
    return kg * 2.20462;
  }

  /**
   * Convertit des unités de poids de livres en kilogrammes
   * @param lb Poids en livres
   * @returns Poids en kilogrammes
   */
  static lbToKg(lb: number): number {
    return lb / 2.20462;
  }

 /**
   * Convertit des unités de volume de litres en gallons
   * @param liters Volume en litres
   * @returns Volume en gallons
   */
  static litersToGallons(liters: number): number {
    return liters * 0.264172;
  }

  /**
   * Convertit des unités de volume de gallons en litres
   * @param gallons Volume en gallons
   * @returns Volume en litres
   */
  static gallonsToLiters(gallons: number): number {
    return gallons / 0.264172;
  }

  /**
   * Convertit des unités de couleur SRM en EBC
   * @param srm Couleur en SRM
   * @returns Couleur en EBC
   */
  static srmToEbc(srm: number): number {
    return srm * 1.97;
  }

 /**
   * Convertit des unités de couleur EBC en SRM
   * @param ebc Couleur en EBC
   * @returns Couleur en SRM
   */
  static ebcToSrm(ebc: number): number {
    return ebc * 0.508;
  }

  /**
   * Obtient la date actuelle au format JJ/MM/AA
   * @returns La date actuelle formatée
   */
  static getDate(): string {
    const date = new Date();
    const year = '' + date.getFullYear();
    const month = date.getMonth() + 1;
    return date.getDate() + '/' + month + '/' + year.slice(2);
  }
}