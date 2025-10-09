export const validateCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const cleanedCpf = cpf.replace(/\D/g, '');

  if (cleanedCpf.length !== 11) return false;

  // Avoid CPFs with all identical digits
  if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

  const calculateDigit = (cpfSlice: string, factorStart: number) => {
    let sum = 0;
    for (let i = 0; i < cpfSlice.length; i++) {
      sum += parseInt(cpfSlice[i], 10) * (factorStart - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstNineDigits = cleanedCpf.slice(0, 9);
  const firstCheckDigit = calculateDigit(firstNineDigits, 10);
  const secondCheckDigit = calculateDigit(
    firstNineDigits + firstCheckDigit,
    11
  );

  return (
    cleanedCpf ===
    firstNineDigits + firstCheckDigit.toString() + secondCheckDigit.toString()
  );
};

// Example
// import { validateCPF } from './utils/validateCPF';
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value;
//   setCpf(value);
//   setIsValid(validateCPF(value));
// };
