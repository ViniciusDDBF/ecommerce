import createVariantHash from './createVariantHash';

export default function getUpdatedVariantParams(
  attributes: { [key: string]: string },
  searchParams: URLSearchParams,
): URLSearchParams {
  const variantHash = createVariantHash(attributes);
  const newSearchParams = new URLSearchParams(searchParams);

  if (variantHash) newSearchParams.set('variant', variantHash);
  else newSearchParams.delete('variant');

  return newSearchParams;
}
