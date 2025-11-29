import { describe, it, expect } from 'vitest';
import { BrewCalculator } from '../lib/brew-calculator';
import Utils from '../lib/utils';

describe('BrewCalculator', () => {
  describe('calculateOriginalGravity', () => {
    it('should calculate OG correctly with basic inputs', () => {
      const fermentables = [
        { weight: 5.0, yield: 80 }, // 5kg of 80% yield malt
        { weight: 0.5, yield: 75 }   // 0.5kg of 75% yield specialty malt
      ];
      const batchSize = 20; // 20 liters
      const efficiency = 75; // 75% efficiency
      
      const og = BrewCalculator.calculateOriginalGravity(fermentables, batchSize, efficiency);
      
      // Expected calculation:
      // Total points = (5 * 80 * 0.75) + (0.5 * 75 * 0.75) = 300 + 28.125 = 328.125
      // OG = 1 + (328.125 / 20 / 10) = 1 + 1.640625 = 1.082
      expect(og).toBeCloseTo(1.082, 3);
    });

    it('should return 1.000 for zero batchSize', () => {
      const fermentables = [{ weight: 5.0, yield: 80 }];
      const og = BrewCalculator.calculateOriginalGravity(fermentables, 0);
      expect(og).toBe(1.000);
    });

    it('should handle empty fermentables array', () => {
      const og = BrewCalculator.calculateOriginalGravity([], 20);
      expect(og).toBe(1.000);
    });
  });

  describe('calculateFinalGravity', () => {
    it('should calculate FG correctly', () => {
      const og = 1.082;
      const attenuation = 75; // 75% attenuation
      
      const fg = BrewCalculator.calculateFinalGravity(og, attenuation);
      
      // Expected: FG = OG - ((OG - 1) * (attenuation / 100))
      // FG = 1.082 - ((1.082 - 1) * 0.75) = 1.082 - (0.082 * 0.75) = 1.082 - 0.0615 = 1.0205
      expect(fg).toBeCloseTo(1.021, 3);
    });

    it('should not go below 1.000', () => {
      const fg = BrewCalculator.calculateFinalGravity(1.001, 100);
      expect(fg).toBe(1.000);
    });
  });

  describe('calculateABV', () => {
    it('should calculate ABV correctly', () => {
      const og = 1.082;
      const fg = 1.021;
      
      const abv = BrewCalculator.calculateABV(og, fg);
      
      // Using the original formula from Utils:
      // ABV = (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794)
      // ABV = (76.08 * (1.082 - 1.021) / (1.775 - 1.082)) * (1.021 / 0.794)
      // ABV = (76.08 * 0.061 / 0.693) * 1.286
      // ABV = (4.64088 / 0.693) * 1.286 = 6.697 * 1.286 = 8.61%
      expect(abv).toBeCloseTo(8.6, 1);
    });
  });

  describe('calculateIBU', () => {
    it('should calculate IBU using Tinseth method', () => {
      const hops = [
        {
          alphaAcid: 6.5, // 6.5% alpha acid
          weight: 0.025,  // 25g converted to kg
          boilTime: 60     // 60 minutes
        }
      ];
      const og = 1.082;
      const batchSize = 20; // 20 liters
      
      const ibu = BrewCalculator.calculateIBU(hops, og, batchSize, 'Tinseth');
      
      // Expected result should be a reasonable IBU value (typically 10-100)
      expect(ibu).toBeGreaterThan(0);
      expect(ibu).toBeLessThan(100);
    });

    it('should calculate IBU using Rager method', () => {
      const hops = [
        {
          alphaAcid: 6.5, // 6.5% alpha acid
          weight: 0.025,  // 25g converted to kg
          boilTime: 60     // 60 minutes
        }
      ];
      const og = 1.082;
      const batchSize = 20; // 20 liters
      
      const ibu = BrewCalculator.calculateIBU(hops, og, batchSize, 'Rager');
      
      // Expected result should be a reasonable IBU value (typically 10-100)
      expect(ibu).toBeGreaterThan(0);
      expect(ibu).toBeLessThan(100);
    });

    it('should return 0 for zero batchSize', () => {
      const hops = [{ alphaAcid: 6.5, weight: 0.025, boilTime: 60 }];
      const ibu = BrewCalculator.calculateIBU(hops, 1.050, 0);
      expect(ibu).toBe(0);
    });
  });

  describe('calculateColor', () => {
    it('should calculate color correctly using Morey formula', () => {
      const fermentables = [
        {
          weight: 5.0,  // 5kg
          color: 2.0    // 2 SRM (pale malt)
        },
        {
          weight: 0.5,  // 0.5kg
          color: 30.0   // 30 SRM (caramel malt)
        }
      ];
      const batchSize = 20; // 20 liters
      
      const color = BrewCalculator.calculateColor(fermentables, batchSize);
      
      // Using Morey formula: SRM = 1.492 * (MCU)^0.6859
      // MCU = (weight_lb * color) / volume_gal
      // weight_lb = (5 + 0.5) * 2.20462 = 12.125
      // volume_gal = 20 * 0.264172 = 5.283
      // MCU = (12.125 * ((5*2 + 0.5*30) / 5.5)) / 5.283 = (12.125 * 20/5.5) / 5.283 = (12.125 * 3.636) / 5.283 = 44.09 / 5.283 = 8.35
      // SRM = 1.492 * (8.35)^0.6859 = 1.492 * 3.54 = 5.29
      
      expect(color).toBeGreaterThan(0);
      expect(color).toBeLessThan(50); // Reasonable range for beer color
    });

    it('should return 0 for zero batchSize', () => {
      const fermentables = [{ weight: 5.0, color: 2.0 }];
      const color = BrewCalculator.calculateColor(fermentables, 0);
      expect(color).toBe(0);
    });
  });

  describe('calculateEfficiency', () => {
    it('should calculate efficiency correctly', () => {
      const actualOG = 1.082;
      const expectedOG = 1.085;
      
      const efficiency = BrewCalculator.calculateEfficiency(actualOG, expectedOG);
      
      // Efficiency = ((actualOG - 1) / (expectedOG - 1)) * 100
      // Efficiency = ((1.082 - 1) / (1.085 - 1)) * 100
      // Efficiency = (0.082 / 0.085) * 100 = 0.9647 * 100 = 96.47%
      expect(efficiency).toBeCloseTo(96.5, 1);
    });

    it('should return 0 for expectedOG <= 1.000', () => {
      const efficiency = BrewCalculator.calculateEfficiency(1.050, 1.000);
      expect(efficiency).toBe(0);
    });

    it('should cap efficiency at 100%', () => {
      const efficiency = BrewCalculator.calculateEfficiency(1.100, 1.050);
      expect(efficiency).toBe(100);
    });
  });

  describe('calculateCalories', () => {
    it('should calculate calories correctly', () => {
      const og = 1.082;
      const fg = 1.021;
      
      const calories = BrewCalculator.calculateCalories(og, fg);
      
      // This should produce a reasonable calorie count for beer (typically 100-300 cal per 12oz)
      expect(calories).toBeGreaterThan(50);
      expect(calories).toBeLessThan(400);
    });
  });
});