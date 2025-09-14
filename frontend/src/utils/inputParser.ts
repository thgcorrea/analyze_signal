/**
 * Parses a comma-separated string of numbers into an array of integers
 * @param input - The comma-separated string (e.g., "1,2,3,4,5")
 * @returns An array of numbers or throws an error if parsing fails
 */
export const parseNumberInput = (input: string): number[] => {
  if (!input.trim()) {
    throw new Error('Sinal não pode ser vazio');
  }

  // Split by comma and trim whitespace
  const parts = input.split(',').map((part) => part.trim());

  // Check for empty parts
  if (parts.some((part) => part === '')) {
    throw new Error('Sinal inválido: valor vazio');
  }

  // Convert to numbers and validate
  const numbers = parts.map((part) => {
    const num = Number(part);
    if (isNaN(num) || !Number.isInteger(num)) {
      throw new Error(
        `Sinal inválido: "${part}". Insira números inteiros separados por vírgula.`
      );
    }
    return num;
  });

  if (numbers.length === 0) {
    throw new Error('Requer ao menos um número');
  }

  return numbers;
};

/**
 * Validates if a string can be parsed as comma-separated integers
 * @param input - The input string to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateNumberInput = (
  input: string
): { isValid: boolean; error?: string } => {
  try {
    parseNumberInput(input);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Valor inválido',
    };
  }
};

/**
 * Formats an array of numbers as a comma-separated string
 * @param numbers - Array of numbers to format
 * @returns Comma-separated string representation
 */
export const formatNumberArray = (numbers: number[]): string => {
  return numbers.join(', ');
};
