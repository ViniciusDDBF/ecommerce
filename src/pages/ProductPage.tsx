import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate, useSearchParams, useLoaderData } from 'react-router-dom';
import { ChevronRight, CirclePlay } from 'lucide-react';
import React from 'react';

// Consolidated interfaces (unchanged)
interface Product {
  product_id: number;
  product_name: string;
  description: string;
  product_slug: string;
  variant_id: number;
  sku: string;
  current_price: number;
  original_price: number;
  stock: number;
  all_images: { url: string; media_type: string }[];
  all_variants: {
    variant_id: number;
    sku: string;
    name: string;
    current_price: number;
    original_price: number;
    stock: number;
    attributes: {
      attribute_name: string;
      attribute_value: string;
      attribute_id: number;
      value_id: number;
    }[];
    dimensions: {
      weight: number;
      height: number;
      width: number;
      length: number;
    };
  }[];
  variant_attributes: {
    [key: string]: {
      value: string;
      stock?: number;
      available_variants?: { variant_id: number; stock: number }[];
      needs_redirect?: boolean;
      variant_slug?: string;
    }[];
  };
  linked_variations?: {
    product_name: string;
    product_slug: string;
    variant_id: number;
    primary_image_url: string;
    primary_image_media_type: string;
    attributes: { [key: string]: string };
  }[];
  category_breadcrumbs: {
    id: number;
    name: string;
    path: string;
    slug: string;
    level: number;
  }[];
}

export default function ProductPage() {
  const product = useLoaderData() as Product | undefined;
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    media_type: string;
  } | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [selectedLinkedVariation, setSelectedLinkedVariation] =
    useState<string>(product?.product_slug || '');
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Utility functions (unchanged)
  const createVariantHash = (attributes: { [key: string]: string }): string => {
    return Object.entries(attributes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([key, value]) => `${key}=${value.toLowerCase().replace(/\s+/g, '-')}`,
      )
      .join('|');
  };

  const parseVariantHash = (hash: string): { [key: string]: string } => {
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
  };

  const updateUrlWithVariant = (attributes: { [key: string]: string }) => {
    const variantHash = createVariantHash(attributes);
    const newSearchParams = new URLSearchParams(searchParams);

    if (variantHash) newSearchParams.set('variant', variantHash);
    else newSearchParams.delete('variant');

    if (searchParams.get('variant') !== variantHash) {
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const initializeDefaultVariant = () => {
    if (!product) return;
    const defaultVariant =
      product.all_variants.find((v) => v.variant_id === product.variant_id) ||
      product.all_variants[0];
    if (!defaultVariant) return;

    const newAttributes: { [key: string]: string } = {};
    defaultVariant.attributes.forEach((attr) => {
      newAttributes[attr.attribute_name] = attr.attribute_value;
    });

    setSelectedAttributes(newAttributes);
    setSelectedVariant(defaultVariant.variant_id);
    if (Object.keys(newAttributes).length > 0)
      updateUrlWithVariant(newAttributes);
  };

  const findCurrentVariant = () => {
    if (!product) return undefined;
    if (Object.keys(selectedAttributes).length === 0) {
      return isInitialized
        ? product.all_variants.find(
            (v) => v.variant_id === product.variant_id,
          ) || product.all_variants[0]
        : undefined;
    }

    return product.all_variants.find((variant) => {
      return Object.entries(selectedAttributes).every(
        ([attrName, attrValue]) => {
          return variant.attributes.some(
            (attr) =>
              attr.attribute_name === attrName &&
              attr.attribute_value.toLowerCase() === attrValue.toLowerCase(),
          );
        },
      );
    });
  };

  const currentVariant = findCurrentVariant();

  // Initialize state from URL on mount
  useEffect(() => {
    if (!product || !product.all_variants || isInitialized) return;

    const variantHash = searchParams.get('variant');
    if (variantHash) {
      const parsedAttributes = parseVariantHash(variantHash);
      const matchingVariant = product.all_variants.find((variant) => {
        return Object.entries(parsedAttributes).every(
          ([attrName, attrValue]) => {
            return variant.attributes.some(
              (attr) =>
                attr.attribute_name === attrName &&
                attr.attribute_value.toLowerCase() === attrValue.toLowerCase(),
            );
          },
        );
      });

      if (matchingVariant) {
        const newAttributes: { [key: string]: string } = {};
        matchingVariant.attributes.forEach((attr) => {
          newAttributes[attr.attribute_name] = attr.attribute_value;
        });
        setSelectedAttributes(newAttributes);
        setSelectedVariant(matchingVariant.variant_id);
        updateUrlWithVariant(newAttributes);
      } else {
        initializeDefaultVariant();
      }
    } else {
      initializeDefaultVariant();
    }
    setIsInitialized(true);
  }, [product, searchParams, isInitialized]);

  // Set default image
  useEffect(() => {
    if (product?.all_images?.length && !selectedMedia) {
      setSelectedMedia(product.all_images[0]);
    }
  }, [product?.all_images, selectedMedia]);

  // Update selected attributes when variant changes
  useEffect(() => {
    if (
      !isInitialized ||
      !currentVariant ||
      currentVariant.variant_id === selectedVariant
    )
      return;

    const newAttributes: { [key: string]: string } = {};
    currentVariant.attributes.forEach((attr) => {
      newAttributes[attr.attribute_name] = attr.attribute_value;
    });
    setSelectedAttributes(newAttributes);
    setSelectedVariant(currentVariant.variant_id);
    updateUrlWithVariant(newAttributes);
  }, [currentVariant, isInitialized]);

  const handleAttributeSelect = (
    attributeName: string,
    value: string,
    needsRedirect?: boolean,
    variantSlug?: string,
  ) => {
    // If there are no linked variations, skip redirect logic
    if (needsRedirect && variantSlug && product?.linked_variations?.length) {
      if (variantSlug !== product.product_slug) {
        navigate(`/products/${variantSlug}`);
        return;
      }
    }

    const newAttributes = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(newAttributes);

    if (!product) return;
    const newVariant = product.all_variants.find((variant) => {
      const matchesPrevious = Object.entries(selectedAttributes).every(
        ([name, val]) =>
          name === attributeName ||
          variant.attributes.some(
            (attr) =>
              attr.attribute_name === name &&
              attr.attribute_value.toLowerCase() === val.toLowerCase(),
          ),
      );
      return (
        matchesPrevious &&
        variant.attributes.some(
          (attr) =>
            attr.attribute_name === attributeName &&
            attr.attribute_value.toLowerCase() === value.toLowerCase(),
        )
      );
    });

    if (newVariant) {
      setSelectedVariant(newVariant.variant_id);
      updateUrlWithVariant(newAttributes);
    }
  };

  const handleLinkedVariationSelect = async (variantSlug: string) => {
    if (!product || !product.linked_variations?.length) {
      // If no linked variations, reset to current product
      setSelectedLinkedVariation(product.product_slug);
      if (product.all_images?.length) setSelectedMedia(product.all_images[0]);
      return;
    }

    if (variantSlug === product.product_slug) {
      setSelectedLinkedVariation(product.product_slug);
      if (product.all_images?.length) setSelectedMedia(product.all_images[0]);
      return;
    }

    if (variantSlug) {
      setSelectedLinkedVariation(variantSlug);
      const variationData = linkedVariationDataMap.get(variantSlug);
      if (variationData && variationData.primary_image_url) {
        setSelectedMedia({
          url: variationData.primary_image_url,
          media_type: variationData.primary_image_media_type,
        });
      }
      await navigate(`/products/${variantSlug}`);
    }
  };

  // Transform variant_attributes with consolidated logic
  const attributeOptions = (() => {
    if (!product?.variant_attributes) return [];

    return Object.entries(product.variant_attributes)
      .map(([name, origValues]) => {
        let values = [...origValues];

        // Sort sizes if applicable
        if (name.toLowerCase() === 'size') {
          const sizeOrder: { [key: string]: number } = {
            xs: -1,
            sm: 0,
            md: 1,
            lg: 2,
            xl: 3,
            xxl: 4,
          };
          values = values.sort((a, b) => {
            // Use empty string as fallback if value is null/undefined
            const aValue = a.value?.toLowerCase() ?? '';
            const bValue = b.value?.toLowerCase() ?? '';
            const oa = sizeOrder[aValue] ?? Infinity;
            const ob = sizeOrder[bValue] ?? Infinity;
            return oa - ob;
          });
        }

        const processedValues = values
          .filter((value) => value.value != null) // Filter out null/undefined values
          .map((value) => ({
            value: value.value,
            stock: value.stock || 0,
            available_variants: value.available_variants || [],
            needs_redirect: value.needs_redirect || false,
            variant_slug:
              value.variant_slug ||
              `${product.product_slug}-${(value.value ?? '').toLowerCase().replace(/\s+/g, '-') || 'default'}`,
          }));

        return {
          name,
          values: processedValues,
          hasRedirect: processedValues.some((value) => value.needs_redirect),
        };
      })
      .sort((a, b) =>
        a.hasRedirect && !b.hasRedirect
          ? -1
          : !a.hasRedirect && b.hasRedirect
            ? 1
            : 0,
      );
  })();

  const linkedVariationDataMap = new Map(
    product?.linked_variations?.map((variation) => [
      variation.product_slug,
      variation,
    ]) || [],
  );

  const getStockStatus = (stock: number) =>
    stock > 5 ? 'in_stock' : stock > 0 ? 'low_stock' : 'out_of_stock';
  const currentStock = currentVariant?.stock || product?.stock || 0;
  const stockStatus = getStockStatus(currentStock);

  if (!isInitialized || !product) return null;

  return (
    <div className="bg-charcoal-800 text-charcoal-300 min-h-screen font-sans">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-10 xl:gap-12">
          {/* Product Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-6">
              {/* Thumbnail Navigation */}
              <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:w-16 sm:flex-col sm:gap-3 sm:overflow-visible md:w-20 lg:w-24">
                {product.all_images.map((item, idx) => {
                  const isSelected = selectedMedia?.url === item.url;
                  const isVideo = item.media_type === 'video';
                  const commonClasses = `ember-hover-border ember-transition hover:animate-glow hover:border-ember-500 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex-shrink-0 cursor-pointer rounded-lg border-2 object-contain ${
                    isSelected ? 'border-ember-500' : 'border-transparent'
                  }`;

                  return isVideo ? (
                    <div key={idx} className="relative flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <CirclePlay className="text-ember-300 h-6 w-6 opacity-80 sm:h-8 sm:w-8" />
                      </div>
                      <video
                        src={item.url}
                        className={commonClasses}
                        onClick={() => setSelectedMedia(item)}
                        muted
                        controls={false}
                        preload="metadata"
                      />
                    </div>
                  ) : (
                    <img
                      key={idx}
                      src={item.url}
                      className={commonClasses}
                      onClick={() => setSelectedMedia(item)}
                      alt={`${product.product_name} thumbnail ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Main Product Image */}
              <div className="order-1 flex-shrink-0 sm:order-2">
                <div className="drop-shadow-ember relative rounded-2xl">
                  {selectedMedia &&
                    (selectedMedia.media_type === 'video' ? (
                      <video
                        src={selectedMedia.url}
                        className="h-auto max-h-[400px] w-full rounded-lg object-contain sm:max-h-[500px]"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={selectedMedia.url}
                        className="h-auto max-h-[400px] w-full rounded-lg object-contain sm:max-h-[500px]"
                        alt={product.product_name}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full space-y-4 sm:space-y-6 lg:w-1/2 lg:space-y-8">
            {/* Product Header */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Breadcrumbs */}
              {product.category_breadcrumbs?.length > 0 && (
                <nav className="mb-4 sm:mb-6">
                  <ol className="text-charcoal-400 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                    {product.category_breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={crumb.id}>
                        {index !== 0 && (
                          <li>
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </li>
                        )}
                        <li className="flex items-center">
                          {index === product.category_breadcrumbs.length - 1 ? (
                            <span className="text-charcoal-300 font-medium">
                              {crumb.name}
                            </span>
                          ) : (
                            <button
                              onClick={() => navigate(crumb.path)}
                              className="hover:text-ember-400 cursor-pointer transition-colors"
                            >
                              {crumb.name}
                            </button>
                          )}
                        </li>
                      </React.Fragment>
                    ))}
                  </ol>
                </nav>
              )}
              <h1 className="text-charcoal-50 text-xl leading-tight font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                {product.product_name}
              </h1>
              <p className="text-charcoal-400 text-sm leading-relaxed sm:text-base lg:text-lg">
                {product.description}
              </p>
              <div className="text-ember-500 text-xl font-bold sm:text-2xl md:text-3xl">
                $
                {(
                  currentVariant?.current_price || product.current_price
                ).toFixed(2)}
                {currentVariant?.original_price &&
                  currentVariant?.original_price >
                    currentVariant?.current_price && (
                    <>
                      <span className="text-charcoal-400 ml-2 text-sm line-through sm:text-base md:text-lg">
                        $
                        {(
                          currentVariant?.original_price ||
                          product.original_price
                        ).toFixed(2)}
                      </span>
                      <span className="text-ember-300 ml-2 text-xs sm:text-sm">
                        {Math.round(
                          ((currentVariant?.original_price -
                            currentVariant?.current_price) /
                            currentVariant?.original_price) *
                            100,
                        )}
                        % OFF
                      </span>
                    </>
                  )}
              </div>
            </div>

            {/* Product Variants/Attributes */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {attributeOptions.map((attributeOption, idx) => {
                const isLinkedVariationAttribute = attributeOption.values.some(
                  (v) => v.needs_redirect,
                );

                return (
                  <div key={idx} className="space-y-2 sm:space-y-3">
                    <span className="text-charcoal-200 block text-sm font-medium sm:text-base md:text-lg">
                      {attributeOption.name}
                    </span>

                    {isLinkedVariationAttribute &&
                    product.linked_variations?.length ? (
                      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:gap-3">
                        {attributeOption.values.map((value, idx) => {
                          const isCurrentProduct =
                            value.variant_slug === product.product_slug;
                          const isSelected =
                            selectedLinkedVariation === value.variant_slug;
                          const variationData = isCurrentProduct
                            ? {
                                primary_image_url:
                                  product.all_images[0]?.url || '',
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
                                  handleLinkedVariationSelect(
                                    value.variant_slug,
                                  );
                              }}
                            >
                              <div
                                className={`bg-charcoal-800 rounded-lg p-2 transition-all duration-200 sm:p-3 ${
                                  isSelected
                                    ? 'bg-ember-500/20 border-ember-500 border-2'
                                    : 'hover:bg-charcoal-700'
                                }`}
                              >
                                {variationData &&
                                'primary_image_url' in variationData &&
                                variationData.primary_image_url ? (
                                  variationData.primary_image_media_type.startsWith(
                                    'video/',
                                  ) ? (
                                    <video
                                      src={variationData.primary_image_url}
                                      className="mb-1 h-20 w-16 rounded-lg object-cover sm:h-24 sm:w-20"
                                      muted
                                      controls={false}
                                      preload="metadata"
                                    />
                                  ) : (
                                    <img
                                      src={variationData.primary_image_url}
                                      alt={value.value}
                                      className="mb-1 h-20 w-16 rounded-lg object-cover sm:h-24 sm:w-20"
                                    />
                                  )
                                ) : (
                                  <div className="bg-charcoal-600 flex h-20 w-16 items-center justify-center rounded-lg sm:h-24 sm:w-20">
                                    <span className="text-charcoal-400 text-xs">
                                      No Image
                                    </span>
                                  </div>
                                )}
                                <div className="text-center">
                                  <div className="text-charcoal-300 line-clamp-2 min-h-[2em] text-xs leading-tight sm:text-sm">
                                    {value.value}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                        {attributeOption.values.map((value) => {
                          const isSelected =
                            selectedAttributes[
                              attributeOption.name
                            ]?.toLowerCase() === value.value.toLowerCase();
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

            {/* Stock Status */}
            {stockStatus !== 'in_stock' && (
              <div className="text-xs sm:text-sm">
                {stockStatus === 'low_stock' ? (
                  <span className="text-yellow-400">
                    Low stock ({currentStock} remaining)
                  </span>
                ) : (
                  <span className="text-red-400">Out of stock</span>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              text="Add to Cart"
              variant="primary"
              size="full"
              endIcon={<span>🛒</span>}
              className="ember-transition hover:animate-glow py-3 text-base font-semibold sm:py-4 sm:text-lg"
              disabled={stockStatus === 'out_of_stock'}
              onClick={() => {
                console.log('Adding to cart:', {
                  product_id: product.product_id,
                  variant_id: selectedVariant,
                  quantity: 1,
                });
              }}
            />

            {/* Product Information Panel */}
            <div className="bg-charcoal-600 glass-effect rounded-xl p-4 sm:p-6">
              <h3 className="text-ember-400 mb-3 text-base font-semibold sm:mb-4 sm:text-lg md:text-xl">
                Product Information
              </h3>
              <ul className="text-charcoal-300 space-y-2 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="text-ember-500 mr-2">•</span>
                  <span>SKU: {currentVariant?.sku || product.sku}</span>
                </li>
                {currentVariant?.dimensions && (
                  <>
                    <li className="flex items-start">
                      <span className="text-ember-500 mr-2">•</span>
                      <span>Weight: {currentVariant.dimensions.weight}kg</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-ember-500 mr-2">•</span>
                      <span>
                        Dimensions: {currentVariant.dimensions.height}x
                        {currentVariant.dimensions.width}x
                        {currentVariant.dimensions.length}cm
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
