export const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  const calcDigit = (slice: string, factors: number[]) => {
    let sum = 0;
    for (let i = 0; i < factors.length; i++) {
      sum += parseInt(slice[i]) * factors[i];
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };

  const first12 = cleaned.slice(0, 12);
  const firstFactors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstCheck = calcDigit(first12, firstFactors);

  const secondFactors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondCheck = calcDigit(first12 + firstCheck, secondFactors);

  return cleaned === `${first12}${firstCheck}${secondCheck}`;
};
