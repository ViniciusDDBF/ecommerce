export default function createVariantHash(attributes: {
  [key: string]: string;
}): string {
  return Object.entries(attributes)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value.toLowerCase().replace(/\s+/g, '-')}`)
    .join('|');
}
