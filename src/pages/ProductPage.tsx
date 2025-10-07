import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, useLoaderData } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  Breadcrumbs,
  Button,
  MediaMainDisplay,
  Modal,
} from '../components/atoms';
import {
  ProductHeader,
  VariantSelector,
  StockStatus,
  Reviews,
  ProductInfoPanel,
} from '../features/';
import { useScroll } from '../hooks/';
import parseVariantHash from '../utils/variants/parseVariantHash';
import getUpdatedVariantParams from '../utils/variants/getUpdatedVariantParams';
import { MediaThumbnails } from '../components/atoms/MediaThumbnails';
import type { IMedia, IProduct } from '../types';

export const ProductPage = () => {
  const product = useLoaderData() as IProduct | undefined;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { scrollTo } = useScroll();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wipIsOpen, setWipIsOpen] = useState<boolean>(false);

  // Initialize state with proper defaults
  const [selectedMedia, setSelectedMedia] = useState<IMedia | null>(() => {
    return product?.all_images?.[0] || null;
  });

  // Initialize variant and attributes based on URL or defaults
  const getInitialState = () => {
    if (
      !product ||
      !product.all_variants ||
      product.all_variants.length === 0
    ) {
      return {
        variant: 0,
        attributes: {},
        linkedVariation: '',
      };
    }

    const variantHash = searchParams.get('variant');

    // Try to match variant from URL
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
        return {
          variant: matchingVariant.variant_id,
          attributes: newAttributes,
          linkedVariation: product.product_slug,
        };
      }
    }

    // Fall back to first variant
    const defaultVariant = product.all_variants[0];
    const defaultAttributes: { [key: string]: string } = {};
    defaultVariant.attributes.forEach((attr) => {
      defaultAttributes[attr.attribute_name] = attr.attribute_value;
    });

    return {
      variant: defaultVariant.variant_id,
      attributes: defaultAttributes,
      linkedVariation: product.product_slug,
    };
  };

  const initialState = getInitialState();
  const [selectedVariant, setSelectedVariant] = useState<number>(
    initialState.variant,
  );
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>(initialState.attributes);
  const [selectedLinkedVariation, setSelectedLinkedVariation] =
    useState<string>(initialState.linkedVariation);

  const updateUrlWithVariant = (attributes: { [key: string]: string }) => {
    const newSearchParams = getUpdatedVariantParams(attributes, searchParams);

    if (searchParams.get('variant') !== newSearchParams.get('variant')) {
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const findCurrentVariant = () => {
    if (!product) return undefined;
    if (!Object.keys(selectedAttributes).length) {
      return product.all_variants[0];
    }

    return product.all_variants.find((variant) =>
      variant.attributes.every(
        (attr) =>
          selectedAttributes[attr.attribute_name]?.toLowerCase() ===
          attr.attribute_value.toLowerCase(),
      ),
    );
  };

  const currentVariant = findCurrentVariant();

  // Update URL on initial mount if needed
  useEffect(() => {
    if (!product || !Object.keys(selectedAttributes).length) return;

    // Only update URL if we have attributes but no variant param
    if (!searchParams.get('variant')) {
      updateUrlWithVariant(selectedAttributes);
    }
  }, []); // Run once on mount

  // Set media when product changes
  useEffect(() => {
    if (product?.all_images?.length && !selectedMedia) {
      setSelectedMedia(product.all_images[0]);
    }
  }, [product]);

  const handleAttributeSelect = (
    attributeName: string,
    value: string,
    needsRedirect: boolean,
    variantSlug: string | null,
  ) => {
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
      if (product) setSelectedLinkedVariation(product.product_slug);
      if (product && product.all_images?.length)
        setSelectedMedia(product.all_images[0]);
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
      if (
        variationData &&
        variationData.primary_image_url &&
        (variationData.primary_image_media_type === 'image' ||
          variationData.primary_image_media_type === 'video')
      ) {
        setSelectedMedia({
          url: variationData.primary_image_url,
          media_type: variationData.primary_image_media_type,
        });
      }
      window.location.href = `/products/${variantSlug}`;
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
            const aValue = a.value?.toLowerCase() ?? '';
            const bValue = b.value?.toLowerCase() ?? '';
            const oa = sizeOrder[aValue] ?? Infinity;
            const ob = sizeOrder[bValue] ?? Infinity;
            return oa - ob;
          });
        }

        const processedValues = values
          .filter((value) => value.value != null)
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
    product?.linked_variations?.map((variation) => {
      return [variation.product_slug, variation];
    }) || [],
  );

  const getStockStatus = (stock: number) =>
    stock > 5 ? 'in_stock' : stock > 0 ? 'low_stock' : 'out_of_stock';
  const currentStock = currentVariant?.stock || product?.stock || 0;
  const stockStatus = getStockStatus(currentStock);

  // Show loading or error state
  if (!product) {
    return (
      <div className="bg-charcoal-800 text-charcoal-300 flex min-h-screen items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-charcoal-800 text-charcoal-300 min-h-screen font-sans">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-10 xl:gap-12">
            {/* ---------- Images ---------- */}

            {window.innerWidth > 640 && (
              <MediaThumbnails
                selectionMode="object"
                mediaList={product.all_images}
                selected={selectedMedia}
                onSelect={(media) => {
                  if (typeof media !== 'number') {
                    setSelectedMedia(media);
                  }
                }}
                thumbnailSize="xl"
                layout={'vertical'}
              />
            )}

            {selectedMedia && (
              <MediaMainDisplay index={1} media={selectedMedia} />
            )}

            {window.innerWidth <= 640 && (
              <MediaThumbnails
                selectionMode="object"
                mediaList={product.all_images}
                selected={selectedMedia}
                onSelect={(media) => {
                  if (typeof media !== 'number') {
                    setSelectedMedia(media);
                  }
                }}
                thumbnailSize="xs"
                layout={'horizontal'}
              />
            )}

            <div className="w-full space-y-4 sm:space-y-6 lg:w-1/2 lg:space-y-8">
              {/* ---------- Breadcrumbs ---------- */}
              <Breadcrumbs
                breadcrumbs={product.category_breadcrumbs}
                navigate={navigate}
              />

              {/* ---------- Product Main info ---------- */}
              <ProductHeader
                averageRating={product?.rating_summary?.average_rating}
                reviewCount={product?.rating_summary?.review_count}
                productName={product.product_name}
                currentPrice={
                  currentVariant?.current_price || product.current_price
                }
                originalPrice={
                  currentVariant?.original_price || product.original_price
                }
                onClick={() => {
                  scrollTo({ target: sectionRef.current });
                }}
              />

              {/* ---------- Product Attribute ---------- */}
              <VariantSelector
                attributeOptions={attributeOptions}
                selectedAttributes={selectedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                handleLinkedVariationSelect={handleLinkedVariationSelect}
                linkedVariationDataMap={linkedVariationDataMap}
                product={product}
                selectedLinkedVariation={selectedLinkedVariation}
              />

              {/* ---------- Stock Status ---------- */}
              <StockStatus
                stockStatus={stockStatus}
                currentStock={currentStock}
              />

              {/* ---------- Add to cart ---------- */}
              <Button
                text="Add to Cart"
                variant="primary"
                size="full"
                endIcon={<ShoppingCart />}
                disabled={stockStatus === 'out_of_stock'}
                onClick={() => {
                  setWipIsOpen(true);
                  console.log('Adding to cart:', {
                    variant_id: selectedVariant,
                    quantity: 1,
                  });
                }}
              />

              {/* ---------- Product Details information ---------- */}
              <ProductInfoPanel
                description={product.description}
                sku={currentVariant?.sku || product.sku}
                dimensions={currentVariant?.dimensions}
              />

              {/* ---------- Review Card ---------- */}
            </div>
          </div>
        </main>
        <div ref={sectionRef}>
          <Reviews
            ratingSummary={product.rating_summary}
            isLoggedIn={true}
            reviews={product.reviews}
            productId={product.product_id}
          />
        </div>
      </div>
      <Modal
        title="WIP"
        message="I'm still developing this feature!"
        buttons={{
          cancel: {
            text: 'OK',
            onClick() {
              setWipIsOpen(false);
            },
          },
        }}
        isOpen={wipIsOpen}
      />
    </>
  );
};
