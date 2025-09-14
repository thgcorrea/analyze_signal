import {
  parseNumberInput,
  validateNumberInput,
  formatNumberArray,
} from '@/utils/inputParser';

describe('inputParser', () => {
  describe('parseNumberInput', () => {
    it('parses valid comma-separated integers', () => {
      expect(parseNumberInput('1,2,3,4,5')).toEqual([1, 2, 3, 4, 5]);
      expect(parseNumberInput('10, 20, 30')).toEqual([10, 20, 30]);
      expect(parseNumberInput(' 1 , 2 , 3 ')).toEqual([1, 2, 3]);
    });

    it('parses single number', () => {
      expect(parseNumberInput('42')).toEqual([42]);
      expect(parseNumberInput(' 42 ')).toEqual([42]);
    });

    it('parses negative numbers', () => {
      expect(parseNumberInput('-1, -2, -3')).toEqual([-1, -2, -3]);
      expect(parseNumberInput('1, -2, 3')).toEqual([1, -2, 3]);
    });

    it('throws error for empty input', () => {
      expect(() => parseNumberInput('')).toThrow('Sinal não pode ser vazio');
      expect(() => parseNumberInput('   ')).toThrow('Sinal não pode ser vazio');
    });

    it('throws error for empty values', () => {
      expect(() => parseNumberInput('1,,3')).toThrow(
        'Sinal inválido: valor vazio'
      );
      expect(() => parseNumberInput('1, ,3')).toThrow(
        'Sinal inválido: valor vazio'
      );
      expect(() => parseNumberInput(',1,2')).toThrow(
        'Sinal inválido: valor vazio'
      );
      expect(() => parseNumberInput('1,2,')).toThrow(
        'Sinal inválido: valor vazio'
      );
    });

    it('throws error for non-numeric values', () => {
      expect(() => parseNumberInput('1,abc,3')).toThrow(
        'Sinal inválido: "abc". Insira números inteiros separados por vírgula.'
      );
      expect(() => parseNumberInput('hello')).toThrow(
        'Sinal inválido: "hello". Insira números inteiros separados por vírgula.'
      );
      expect(() => parseNumberInput('1,2,world')).toThrow(
        'Sinal inválido: "world". Insira números inteiros separados por vírgula.'
      );
    });

    it('throws error for decimal numbers', () => {
      expect(() => parseNumberInput('1.5,2,3')).toThrow(
        'Sinal inválido: "1.5". Insira números inteiros separados por vírgula.'
      );
      expect(() => parseNumberInput('1,2.5,3')).toThrow(
        'Sinal inválido: "2.5". Insira números inteiros separados por vírgula.'
      );
    });

    it('throws error for special values', () => {
      expect(() => parseNumberInput('Infinity')).toThrow(
        'Sinal inválido: "Infinity". Insira números inteiros separados por vírgula.'
      );
      expect(() => parseNumberInput('NaN')).toThrow(
        'Sinal inválido: "NaN". Insira números inteiros separados por vírgula.'
      );
    });
  });

  describe('validateNumberInput', () => {
    it('returns isValid true for valid input', () => {
      expect(validateNumberInput('1,2,3,4,5')).toEqual({ isValid: true });
      expect(validateNumberInput('42')).toEqual({ isValid: true });
      expect(validateNumberInput('-1, -2, -3')).toEqual({ isValid: true });
    });

    it('returns isValid false with error message for invalid input', () => {
      const result = validateNumberInput('1,abc,3');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        'Sinal inválido: "abc". Insira números inteiros separados por vírgula.'
      );
    });

    it('returns isValid false for empty input', () => {
      const result = validateNumberInput('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Sinal não pode ser vazio');
    });

    it('returns isValid false for input with empty values', () => {
      const result = validateNumberInput('1,,3');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Sinal inválido: valor vazio');
    });

    it('returns isValid false for decimal numbers', () => {
      const result = validateNumberInput('1.5,2,3');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        'Sinal inválido: "1.5". Insira números inteiros separados por vírgula.'
      );
    });
  });

  describe('formatNumberArray', () => {
    it('formats array of numbers as comma-separated string', () => {
      expect(formatNumberArray([1, 2, 3, 4, 5])).toBe('1, 2, 3, 4, 5');
      expect(formatNumberArray([42])).toBe('42');
      expect(formatNumberArray([-1, -2, -3])).toBe('-1, -2, -3');
    });

    it('handles empty array', () => {
      expect(formatNumberArray([])).toBe('');
    });

    it('handles mixed positive and negative numbers', () => {
      expect(formatNumberArray([1, -2, 3, -4])).toBe('1, -2, 3, -4');
    });

    it('handles large numbers', () => {
      expect(formatNumberArray([1000, 2000, 3000])).toBe('1000, 2000, 3000');
    });
  });
});
