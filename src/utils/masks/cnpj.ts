export const maskCNPJ = (value: unknown): string => {
       if (typeof value !== 'string') {
         return '';
       }
       const digits = value.replace(/\D/g, '').slice(0, 14);
       const parts = [
         digits.slice(0, 2),
         digits.slice(2, 5),
         digits.slice(5, 8),
         digits.slice(8, 12),
         digits.slice(12, 14),
       ].filter(part => part);
       if (parts.length === 1) return parts[0];
       if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
       if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
       if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}/${parts[3]}`;
       return `${parts[0]}.${parts[1]}.${parts[2]}/${parts[3]}-${parts[4]}`;
     };