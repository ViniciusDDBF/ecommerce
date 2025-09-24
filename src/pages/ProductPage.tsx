// #region /* ---------- Imports ---------- */
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';
import { useLoaderData } from 'react-router-dom';
import { ChevronRight, CirclePlay } from 'lucide-react';
// #endregion

// #region /* ---------- Types ---------- */
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
      available_variants?: {
        variant_id: number;
        stock: number;
      }[];
      needs_redirect?: boolean;
      variant_slug?: string;
    }[];
  };
  linked_variations: {
    product_name: string;
    product_slug: string;
    variant_id: number;
    primary_image_url: string;
    primary_image_media_type: string;
    attributes: {
      [key: string]: string;
    };
  }[];
  category_breadcrumbs: {
    id: number;
    name: string;
    path: string;
    slug: string;
    level: number;
  }[];
}

interface AttributeOption {
  name: string;
  values: {
    value: string;
    stock: number;
    available_variants: {
      variant_id: number;
      stock: number;
    }[];
    needs_redirect?: boolean;
    variant_slug: string;
  }[];
  hasRedirect?: boolean;
}

interface SelectedAttributes {
  [key: string]: string;
}

interface MediaItem {
  url: string;
  media_type: string;
}
// #endregion

export default function ProductPage() {
  // #region /* ---------- Hooks ---------- */
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const product = useLoaderData() as Product | undefined;
  const [selectedLinkedVariation, setSelectedLinkedVariation] =
    useState<string>(product?.product_slug || '');
  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // #endregion

  // #region /* ---------- URL State Management ---------- */
  // Helper function to create variant hash from attributes
  const createVariantHash = (attributes: SelectedAttributes): string => {
    const sortedAttributes = Object.entries(attributes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([key, value]) => `${key}=${value.toLowerCase().replace(/\s+/g, '-')}`,
      );
    return sortedAttributes.join('|');
  };

  // Helper function to parse variant hash from URL
  const parseVariantHash = (hash: string): SelectedAttributes => {
    if (!hash) return {};
    return hash.split('|').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      if (key && value) {
        acc[key] = value
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }
      return acc;
    }, {} as SelectedAttributes);
  };

  // Update URL when variant changes
  const updateUrlWithVariant = (attributes: SelectedAttributes) => {
    const variantHash = createVariantHash(attributes);
    const newSearchParams = new URLSearchParams(searchParams);

    if (variantHash) {
      newSearchParams.set('variant', variantHash);
    } else {
      newSearchParams.delete('variant');
    }

    // Only update if the variant parameter actually changed
    const currentVariantHash = searchParams.get('variant');
    if (currentVariantHash !== variantHash) {
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  // Initialize state from URL on mount
  useEffect(() => {
    if (!product || !product.all_variants || isInitialized) return;

    const variantHash = searchParams.get('variant');

    if (variantHash) {
      // Try to initialize from URL
      const parsedAttributes = parseVariantHash(variantHash);

      // Find matching variant from URL attributes
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
        // URL variant found, use it
        const newAttributes: SelectedAttributes = {};
        matchingVariant.attributes.forEach((attr) => {
          newAttributes[attr.attribute_name] = attr.attribute_value;
        });

        setSelectedAttributes(newAttributes);
        setSelectedVariant(matchingVariant.variant_id);
        updateUrlWithVariant(newAttributes);
      } else {
        // Invalid URL variant, fallback to default
        initializeDefaultVariant();
      }
    } else {
      // No URL variant, use default
      initializeDefaultVariant();
    }

    setIsInitialized(true);
  }, [product, searchParams, isInitialized]);

  // Initialize with default variant
  const initializeDefaultVariant = () => {
    if (!product) return;
    const defaultVariant =
      product.all_variants.find((v) => v.variant_id === product.variant_id) ||
      product.all_variants[0];

    if (defaultVariant) {
      const newAttributes: SelectedAttributes = {};
      defaultVariant.attributes.forEach((attr) => {
        newAttributes[attr.attribute_name] = attr.attribute_value;
      });

      setSelectedAttributes(newAttributes);
      setSelectedVariant(defaultVariant.variant_id);

      // Don't update URL for default variant unless there are attributes to show
      if (Object.keys(newAttributes).length > 0) {
        updateUrlWithVariant(newAttributes);
      }
    }
  };
  // #endregion

  // #region /* ---------- Data Transformations ---------- */
  // Transform variant_attributes to match attribute_options structure
  const attributeOptions: AttributeOption[] = (() => {
    if (!product?.variant_attributes) return [];

    // Convert variant_attributes into an array of AttributeOption objects
    const options = Object.entries(product.variant_attributes).map(
      ([name, origValues]) => {
        let values = [...origValues];

        // Handle different attribute types
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
            const va = a.value.toLowerCase();
            const vb = b.value.toLowerCase();
            const oa = sizeOrder[va] ?? Infinity;
            const ob = sizeOrder[vb] ?? Infinity;
            return oa - ob;
          });
        }

        const processedValues = values.map((value) => ({
          value: value.value,
          stock: value.stock || 0,
          available_variants: value.available_variants || [],
          needs_redirect: value.needs_redirect || false,
          variant_slug:
            value.variant_slug ||
            `${product.product_slug}-${value.value.toLowerCase().replace(/\s+/g, '-')}`,
        }));

        return {
          name,
          values: processedValues,
          // Flag to indicate if this attribute has any values with needs_redirect: true
          hasRedirect: processedValues.some((value) => value.needs_redirect),
        };
      },
    );

    // Sort options so attributes with needs_redirect: true come first
    return options.sort((a, b) => {
      if (a.hasRedirect && !b.hasRedirect) return -1;
      if (!a.hasRedirect && b.hasRedirect) return 1;
      return 0;
    });
  })();

  // Map linked variation slugs to their data for image/price lookup
  const linkedVariationDataMap = new Map(
    product?.linked_variations?.map((variation) => [
      variation.product_slug,
      variation,
    ]) || [],
  );

  // Find current variant based on selected attributes
  const findCurrentVariant = ():
    | NonNullable<Product['all_variants'][0]>
    | undefined => {
    if (!product) return undefined;
    if (Object.keys(selectedAttributes).length === 0 && !isInitialized) {
      return undefined; // Wait for initialization
    }

    if (Object.keys(selectedAttributes).length === 0) {
      return (
        product.all_variants.find((v) => v.variant_id === product.variant_id) ||
        product.all_variants[0]
      );
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

  // Handle attribute selection
  const handleAttributeSelect = (
    attributeName: string,
    value: string,
    needsRedirect?: boolean,
    variantSlug?: string,
  ) => {
    if (needsRedirect && variantSlug && variantSlug !== product?.product_slug) {
      setLoader(true);
      if (window.location) {
        window.location.href = `/products/${variantSlug}`;
      }
      return;
    }

    const newAttributes = {
      ...selectedAttributes,
      [attributeName]: value,
    };

    setSelectedAttributes(newAttributes);

    // Find the variant that matches this new selection
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

  // Handle linked variation selection
  const handleLinkedVariationSelect = (variantSlug: string) => {
    if (variantSlug === product?.product_slug) {
      setSelectedLinkedVariation(product.product_slug);
      return;
    }

    if (variantSlug) {
      setSelectedLinkedVariation(variantSlug);
      // You might want to update URL here too if needed
    }
  };

  // Default to first image if available
  useEffect(() => {
    if (
      product?.all_images?.length &&
      product.all_images.length > 0 &&
      !selectedMedia
    ) {
      setSelectedMedia(product.all_images[0]);
    }
  }, [product?.all_images, selectedMedia]);

  // Update selected attributes when variant changes (only after initialization)
  useEffect(() => {
    if (
      !isInitialized ||
      !currentVariant ||
      currentVariant.variant_id === selectedVariant
    ) {
      return;
    }

    const newAttributes: SelectedAttributes = {};
    currentVariant.attributes.forEach((attr) => {
      newAttributes[attr.attribute_name] = attr.attribute_value;
    });
    setSelectedAttributes(newAttributes);
    setSelectedVariant(currentVariant.variant_id);
    updateUrlWithVariant(newAttributes);
  }, [currentVariant, isInitialized]);

  // Helper function to get stock status
  const getStockStatus = (stock: number) => {
    if (stock > 5) return 'in_stock';
    if (stock > 0) return 'low_stock';
    return 'out_of_stock';
  };

  const currentStock = currentVariant?.stock || product?.stock || 0;
  const stockStatus = getStockStatus(currentStock);

  // #endregion

  // Show loading state until initialized
  if (!isInitialized || !product) {
    return <LoadingOverlay />;
  }

  console.log(product);
  return (
    <>
      {loader && <LoadingOverlay />}
      <div className="bg-charcoal-800 text-charcoal-300 min-h-screen font-sans">
        {/* ---------- Main Content Container ---------- */}
        <main className="w-full px-4 py-6 sm:px-6 lg:px-12 lg:py-10">
          {/* ---------- Product Layout (Image + Details) ---------- */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* ---------- Product Images Section ---------- */}
            <div className="w-full flex-shrink-0 lg:w-auto">
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-row lg:gap-6">
                {/* ---------- Thumbnail Navigation ---------- */}
                <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:w-20 sm:flex-col sm:gap-4 sm:overflow-visible md:w-24 lg:w-32">
                  {product.all_images.map((item, idx) => {
                    const isSelected = selectedMedia?.url === item.url;
                    const isVideo = item.media_type === 'video';
                    const commonClasses = `ember-hover-border ember-transition hover:animate-glow hover:border-ember-500 h-16 w-16 flex-shrink-0 cursor-pointer rounded-lg border-2 object-contain sm:h-20 sm:w-full sm:flex-shrink md:h-24 lg:h-39 ${
                      isSelected ? 'border-ember-500' : 'border-transparent'
                    }`;

                    return isVideo ? (
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <CirclePlay className="text-ember-300 h-12 w-12 opacity-80" />
                        </div>
                        <video
                          key={idx}
                          src={item.url}
                          className={commonClasses}
                          onClick={() => {
                            setSelectedMedia(item);
                          }}
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
                        onClick={() => {
                          setSelectedMedia(item);
                        }}
                      />
                    );
                  })}
                </div>

                {/* ---------- Main Product Image ---------- */}
                <div className="order-1 flex-shrink-0 sm:order-2">
                  <div className="drop-shadow-ember relative rounded-2xl">
                    {selectedMedia && (
                      <>
                        {selectedMedia.media_type === 'video' ? (
                          <video
                            src={selectedMedia.url}
                            className="h-full max-h-[500px] w-full max-w-[480px] rounded-lg"
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={selectedMedia.url}
                            className="h-full w-full max-w-full rounded-lg object-contain sm:h-80 sm:w-64 md:h-96 md:w-80 lg:h-[500px] lg:w-96 xl:h-[580px] xl:w-[480px]"
                            alt={product.product_name}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Product Details Section ---------- */}
            <div className="max-w-xl min-w-0 flex-1 space-y-6 lg:space-y-8">
              {/* ---------- Product Header ---------- */}
              <div className="space-y-4 lg:space-y-6">
                {/* ---------- Breadcrumbs ---------- */}
                {product.category_breadcrumbs &&
                  product.category_breadcrumbs.length > 0 && (
                    <nav className="mb-6">
                      <ol className="text-charcoal-400 flex items-center space-x-2 text-sm">
                        {product.category_breadcrumbs.map((crumb, index) => (
                          <>
                            {index !== 0 && (
                              <li key={`separator-${index}`}>
                                <ChevronRight className="size-5" />
                              </li>
                            )}
                            <li key={crumb.id} className="flex items-center">
                              {index ===
                              product.category_breadcrumbs.length - 1 ? (
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
                          </>
                        ))}
                      </ol>
                    </nav>
                  )}
                <h1 className="text-charcoal-50 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
                  {product.product_name}
                </h1>
                <p className="text-charcoal-400 text-base leading-relaxed lg:text-lg">
                  {product.description}
                </p>
                <div className="text-ember-500 text-2xl font-bold sm:text-3xl lg:text-4xl">
                  $
                  {(
                    currentVariant?.current_price || product.current_price
                  ).toFixed(2)}
                  {currentVariant?.original_price &&
                    currentVariant?.original_price >
                      currentVariant?.current_price && (
                      <span className="text-charcoal-400 ml-2 text-lg line-through sm:text-xl lg:ml-3">
                        $
                        {(
                          currentVariant?.original_price ||
                          product.original_price
                        ).toFixed(2)}
                      </span>
                    )}
                  {currentVariant?.original_price &&
                    currentVariant?.original_price >
                      currentVariant?.current_price && (
                      <span className="text-ember-300 ml-2 text-sm">
                        {Math.round(
                          ((currentVariant?.original_price -
                            currentVariant?.current_price) /
                            currentVariant?.original_price) *
                            100,
                        )}
                        % OFF
                      </span>
                    )}
                </div>
              </div>

              {/* ---------- Product Variants/Attributes ---------- */}
              <div className="space-y-4 lg:space-y-6">
                {attributeOptions.map((attributeOption, idx) => {
                  const isLinkedVariationAttribute =
                    attributeOption.values.some((v) => v.needs_redirect);

                  return (
                    <div key={idx} className="space-y-3 lg:space-y-4">
                      <span className="text-charcoal-200 block text-base font-medium lg:text-lg">
                        {attributeOption.name}
                      </span>

                      {/* ---------- Linked Variation Attribute ---------- */}
                      {isLinkedVariationAttribute ? (
                        <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
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
                                  if (value.variant_slug) {
                                    handleLinkedVariationSelect(
                                      value.variant_slug,
                                    );
                                  }
                                  if (
                                    value.needs_redirect &&
                                    value.variant_slug !== product.product_slug
                                  ) {
                                    setLoader(true);
                                    window.location.href = `/products/${value.variant_slug}`;
                                  }
                                }}
                              >
                                {/* Product Image */}
                                <div
                                  className={`bg-charcoal-800 rounded-2xl px-4 py-1 transition-all duration-200 ${
                                    isSelected
                                      ? 'bg-ember-500/20 border-ember-500 border-2'
                                      : 'hover:bg-charcoal-700'
                                  }`}
                                >
                                  {/* Product Name */}
                                  <div className="mt-2 text-center">
                                    <div className="text-charcoal-300 line-clamp-2 min-h-[2.5em] px-1 text-xs leading-tight">
                                      {value.value}
                                    </div>
                                  </div>
                                  {variationData &&
                                  'primary_image_url' in variationData &&
                                  variationData.primary_image_url ? (
                                    variationData.primary_image_media_type.startsWith(
                                      'video/',
                                    ) ? (
                                      <video
                                        src={variationData.primary_image_url}
                                        className="mb-2 h-28 w-24 rounded-lg object-cover"
                                        muted
                                        controls={false}
                                        preload="metadata"
                                      />
                                    ) : (
                                      <img
                                        src={variationData.primary_image_url}
                                        alt={value.value}
                                        className="mb-2 h-28 w-24 rounded-lg object-cover"
                                      />
                                    )
                                  ) : (
                                    <div className="bg-charcoal-600 flex h-28 w-24 items-center justify-center rounded-lg">
                                      <span className="text-charcoal-400 text-xs">
                                        No Image
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* ---------- Regular Attribute Rendering ---------- */
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
                                variant={'outline'}
                                size="md"
                                selected={isSelected}
                                disabled={!hasStock}
                                onClick={() => {
                                  handleAttributeSelect(
                                    attributeOption.name,
                                    value.value,
                                    value.needs_redirect,
                                    value.variant_slug,
                                  );
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ---------- Stock Status ---------- */}
              {stockStatus !== 'in_stock' && (
                <div className="text-sm">
                  {stockStatus === 'low_stock' ? (
                    <span className="text-yellow-400">
                      Low stock ({currentStock} remaining)
                    </span>
                  ) : (
                    <span className="text-red-400">Out of stock</span>
                  )}
                </div>
              )}

              {/* ---------- Add to Cart Button ---------- */}
              {
                <Button
                  text="Add to Cart"
                  variant="primary"
                  size="full"
                  endIcon={<span>🛒</span>}
                  className="ember-transition hover:animate-glow py-4 text-lg font-semibold lg:py-5 lg:text-xl"
                  disabled={stockStatus === 'out_of_stock'}
                  onClick={() => {
                    // You can now pass the selectedVariant ID to your cart API
                    console.log('Adding to cart:', {
                      product_id: product.product_id,
                      variant_id: selectedVariant,
                      quantity: 1,
                    });
                  }}
                />
              }

              {/* Product Information Panel */}
              <div className="bg-charcoal-600 glass-effect rounded-xl p-4 lg:p-6">
                <h3 className="text-ember-400 mb-4 text-lg font-semibold lg:mb-5 lg:text-xl">
                  Product Information
                </h3>
                <ul className="text-charcoal-300 space-y-2">
                  <li className="flex items-start text-sm">
                    <span className="text-ember-500 mr-2">•</span>
                    <span>SKU: {currentVariant?.sku || product.sku}</span>
                  </li>
                  {currentVariant?.dimensions && (
                    <>
                      <li className="flex items-start text-sm">
                        <span className="text-ember-500 mr-2">•</span>
                        <span>
                          Weight: {currentVariant.dimensions.weight}kg
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
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
    </>
  );
}
