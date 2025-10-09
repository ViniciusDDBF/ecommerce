export const validateCNPJ = (cnpj: unknown): boolean => {
  if (typeof cnpj !== 'string' || !cnpj) {
    return false;
  }
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length !== 14) {
    return false;
  }
  if (/^(\d)\1{13}$/.test(cleaned)) {
    return false;
  }
  const calcCheckDigit = (digits: string, factors: number[]): number => {
    const sum = digits
      .split('')
      .reduce((acc, digit, i) => acc + parseInt(digit, 10) * factors[i], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  const firstFactors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondFactors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const first12 = cleaned.slice(0, 12);
  const firstCheckDigit = calcCheckDigit(first12, firstFactors);
  const secondCheckDigit = calcCheckDigit(
    first12 + firstCheckDigit,
    secondFactors,
  );
  return cleaned === `${first12}${firstCheckDigit}${secondCheckDigit}`;
};
