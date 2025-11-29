import { describe, it, expect } from 'vitest';
import Utils from '../lib/utils';

describe('Utils', () => {
  describe('roundDecimal', () => {
    it('should round to 2 decimal places by default', () => {
      expect(Utils.roundDecimal(3.14159)).toBe(3.14);
      expect(Utils.roundDecimal(2.567)).toBe(2.57);
    });

    it('should round to specified decimal places', () => {
      expect(Utils.roundDecimal(3.14159, 3)).toBe(3.142);
      expect(Utils.roundDecimal(3.14159, 1)).toBe(3.1);
      expect(Utils.roundDecimal(3.14159, 0)).toBe(3);
    });

    it('should handle negative numbers', () => {
      expect(Utils.roundDecimal(-3.14159, 2)).toBe(-3.14);
      expect(Utils.roundDecimal(-2.567, 1)).toBe(-2.6);
    });
  });

  describe('sgToPlato', () => {
    it('should convert specific gravity to Plato', () => {
      // Known values for testing
      expect(Utils.sgToPlato(1.000)).toBeCloseTo(0, 1);
      expect(Utils.sgToPlato(1.050)).toBeCloseTo(12.5, 1);
      expect(Utils.sgToPlato(1.100)).toBeCloseTo(25.0, 1);
    });
  });

  describe('platoToSg', () => {
    it('should convert Plato to specific gravity', () => {
      expect(Utils.platoToSg(0)).toBeCloseTo(1.000, 3);
      expect(Utils.platoToSg(12.5)).toBeCloseTo(1.050, 3);
      expect(Utils.platoToSg(25.0)).toBeCloseTo(1.100, 3);
    });
  });

  describe('onceToLiter', () => {
    it('should convert ounces to liters', () => {
      expect(Utils.onceToLiter(12)).toBeCloseTo(0.355, 3); // 12 oz ≈ 0.355 L
      expect(Utils.onceToLiter(16)).toBeCloseTo(0.473, 3); // 16 oz ≈ 0.473 L
    });
  });

  describe('cToF and fToC', () => {
    it('should convert Celsius to Fahrenheit', () => {
      expect(Utils.cToF(0)).toBe(32);
      expect(Utils.cToF(100)).toBe(212);
      expect(Utils.cToF(20)).toBeCloseTo(68, 1);
    });

    it('should convert Fahrenheit to Celsius', () => {
      expect(Utils.fToC(32)).toBe(0);
      expect(Utils.fToC(212)).toBe(100);
      expect(Utils.fToC(68)).toBeCloseTo(20, 1);
    });

    it('should be reversible', () => {
      const celsius = 25;
      const fahrenheit = Utils.cToF(celsius);
      const convertedBack = Utils.fToC(fahrenheit);
      expect(convertedBack).toBeCloseTo(celsius, 10);
    });
  });

  describe('yieldToPpg and ppgToYield', () => {
    it('should convert yield percentage to PPG', () => {
      expect(Utils.yieldToPpg(80)).toBeCloseTo(37.0, 1); // 80% yield ≈ 37 PPG
    });

    it('should convert PPG to yield percentage', () => {
      expect(Utils.ppgToYield(37)).toBeCloseTo(80, 1); // 37 PPG ≈ 80% yield
    });

    it('should be reversible', () => {
      const yieldPercent = 75;
      const ppg = Utils.yieldToPpg(yieldPercent);
      const convertedBack = Utils.ppgToYield(ppg);
      expect(convertedBack).toBeCloseTo(yieldPercent, 10);
    });
  });

  describe('kgToLb and lbToKg', () => {
    it('should convert kilograms to pounds', () => {
      expect(Utils.kgToLb(1)).toBeCloseTo(2.205, 3);
      expect(Utils.kgToLb(5)).toBeCloseTo(11.023, 3);
    });

    it('should convert pounds to kilograms', () => {
      expect(Utils.lbToKg(2.205)).toBeCloseTo(1, 3);
      expect(Utils.lbToKg(11.023)).toBeCloseTo(5, 3);
    });

    it('should be reversible', () => {
      const kg = 10;
      const lb = Utils.kgToLb(kg);
      const convertedBack = Utils.lbToKg(lb);
      expect(convertedBack).toBeCloseTo(kg, 10);
    });
  });

  describe('litersToGallons and gallonsToLiters', () => {
    it('should convert liters to gallons', () => {
      expect(Utils.litersToGallons(1)).toBeCloseTo(0.264, 3);
      expect(Utils.litersToGallons(20)).toBeCloseTo(5.283, 3);
    });

    it('should convert gallons to liters', () => {
      expect(Utils.gallonsToLiters(1)).toBeCloseTo(3.785, 3);
      expect(Utils.gallonsToLiters(5.283)).toBeCloseTo(20, 2);
    });

    it('should be reversible', () => {
      const liters = 25;
      const gallons = Utils.litersToGallons(liters);
      const convertedBack = Utils.gallonsToLiters(gallons);
      expect(convertedBack).toBeCloseTo(liters, 10);
    });
  });

  describe('srmToEbc and ebcToSrm', () => {
    it('should convert SRM to EBC', () => {
      expect(Utils.srmToEbc(10)).toBeCloseTo(19.7, 1);
      expect(Utils.srmToEbc(20)).toBeCloseTo(39.4, 1);
    });

    it('should convert EBC to SRM', () => {
      expect(Utils.ebcToSrm(19.7)).toBeCloseTo(10, 1);
      expect(Utils.ebcToSrm(39.4)).toBeCloseTo(20, 1);
    });

    it('should be reversible', () => {
      const srm = 15;
      const ebc = Utils.srmToEbc(srm);
      const convertedBack = Utils.ebcToSrm(ebc);
      expect(convertedBack).toBeCloseTo(srm, 10);
    });
  });

  describe('getDate', () => {
    it('should return current date in DD/MM/YY format', () => {
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{2}$/;
      const date = Utils.getDate();
      expect(date).toMatch(dateRegex);
    });
  });
});