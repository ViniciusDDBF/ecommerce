export const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11); // max 11 digits
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

// Example
// import { maskPhone } from './utils/masks';
// <input
//   placeholder="Phone"
//   value={phone}
//   onChange={(e) => setPhone(maskPhone(e.target.value))}
// />;
