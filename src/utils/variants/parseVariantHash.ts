export default function parseVariantHash(hash: string): {
  [key: string]: string;
} {
  if (!hash) return {};
  return hash.split('|').reduce(
    (acc, pair) => {
      const [key, value] = pair.split('=');
      if (key && value) {
        acc[key] = value
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }
      return acc;
    },
    {} as { [key: string]: string },
  );
}
