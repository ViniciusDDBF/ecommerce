import type { FC, VariantSelectorProps } from '@/types';
import { Button } from '@/components/atoms';

export const VariantSelector: FC<VariantSelectorProps> = ({
  attributeOptions,
  selectedAttributes,
  handleAttributeSelect,
  handleLinkedVariationSelect,
  linkedVariationDataMap,
  product,
  selectedLinkedVariation,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {attributeOptions.map((attributeOption, idx) => {
        const isLinkedVariationAttribute = attributeOption.values.some(
          (v) => v.needs_redirect,
        );

        return (
          <div key={idx} className="space-y-2 sm:space-y-3">
            {
              <span className="text-charcoal-200 block text-sm font-medium sm:text-base md:text-lg">
                {attributeOption.values.length > 0 && attributeOption.name}
              </span>
            }

            {isLinkedVariationAttribute && product.linked_variations?.length ? (
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:gap-3">
                {attributeOption.values.map((value, idx) => {
                  const isCurrentProduct =
                    value.variant_slug === product.product_slug;
                  const isSelected =
                    selectedLinkedVariation === value.variant_slug;
                  const variationData = isCurrentProduct
                    ? {
                        primary_image_url: product.all_images[0]?.url || '',
                        primary_image_media_type:
                          product.all_images[0]?.media_type || '',
                      }
                    : linkedVariationDataMap.get(value.variant_slug);

                  return (
                    <div
                      key={idx}
                      className={`group relative flex-shrink-0 cursor-pointer transition-all duration-200`}
                      onClick={() => {
                        if (value.variant_slug)
                          handleLinkedVariationSelect(value.variant_slug);
                      }}
                    >
                      <div
                        className={`bg-charcoal-800 rounded-lg p-2 transition-all duration-200 sm:p-3 ${
                          isSelected
                            ? 'bg-charcoal-700 border-charcoal-500 cursor-auto border-2'
                            : 'hover:bg-charcoal-700'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-charcoal-300 line-clamp-2 min-h-[2em] text-xs leading-tight sm:text-sm">
                            {value.value}
                          </div>
                        </div>
                        {variationData &&
                          'primary_image_url' in variationData && (
                            <img
                              src={variationData.primary_image_url}
                              alt={value.value}
                              className="mb-1 h-20 w-16 rounded-lg object-cover sm:h-24 sm:w-20"
                            />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                {attributeOption.values.map((value) => {
                  const isSelected =
                    selectedAttributes[attributeOption.name]?.toLowerCase() ===
                    value.value.toLowerCase();
                  const hasStock =
                    value.stock > 0 ||
                    value.available_variants.some((v) => v.stock > 0);

                  return (
                    <Button
                      key={value.variant_slug || value.value}
                      text={value.value}
                      variant="outline"
                      size="sm"
                      selected={isSelected}
                      disabled={!hasStock}
                      onClick={() =>
                        handleAttributeSelect(
                          attributeOption.name,
                          value.value,
                          value.needs_redirect,
                          value.variant_slug,
                        )
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
