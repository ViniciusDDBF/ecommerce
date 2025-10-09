import type { IattributeOption, Iproduct } from '@/types';

export interface VariantSelectorProps {
  attributeOptions: IattributeOption[];
  selectedAttributes: { [key: string]: string };
  handleAttributeSelect: (
    attributeName: string,
    value: string,
    needsRedirect: boolean,
    variantSlug: string | null,
  ) => void;
  handleLinkedVariationSelect: (variantSlug: string) => void;
  linkedVariationDataMap: Map<
    string,
    {
      product_name: string;
      product_slug: string;
      variant_id: number;
      primary_image_url: string;
      primary_image_media_type: string;
      attributes: { [key: string]: string };
    }
  >;
  product: Iproduct;
  selectedLinkedVariation: string;
}
