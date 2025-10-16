import type { Media, Product } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  Breadcrumbs,
  Button,
  MediaMainDisplay,
  Modal,
} from '@/components/atoms';
import { MediaThumbnails } from '../components/atoms/MediaThumbnails';
import {
  ProductHeader,
  ProductInfoPanel,
  Reviews,
  StockStatus,
  VariantSelector,
} from '../features/';
import { useScroll } from '../hooks/';
import getUpdatedVariantParams from '../utils/variants/getUpdatedVariantParams';
import parseVariantHash from '../utils/variants/parseVariantHash';

export const ProductPage = () => {
  const product = useLoaderData() as Product | undefined;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { scrollTo } = useScroll();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wipIsOpen, setWipIsOpen] = useState<boolean>(false);

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(() => {
    return product?.all_images?.[0] || null;
  });

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

  const updateUrlWithVariant = useCallback(
    (attributes: { [key: string]: string }) => {
      const newSearchParams = getUpdatedVariantParams(attributes, searchParams);

      if (searchParams.get('variant') !== newSearchParams.get('variant')) {
        setSearchParams(newSearchParams, { replace: true });
      }
    },
    [searchParams, setSearchParams],
  );

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

  useEffect(() => {
    if (!product || !Object.keys(selectedAttributes).length) return;

    if (!searchParams.get('variant')) {
      updateUrlWithVariant(selectedAttributes);
    }
  }, [product, searchParams, selectedAttributes, updateUrlWithVariant]);

  useEffect(() => {
    if (product?.all_images?.length && !selectedMedia) {
      setSelectedMedia(product.all_images[0]);
    }
  }, [product, selectedMedia]);

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
    if (!product) return null;

    if (variantSlug === product.product_slug) {
      return;
    }

    if (variantSlug) {
      setSelectedLinkedVariation(variantSlug);

      window.location.href = `/products/${variantSlug}`;
    }
  };

  const attributeOptions = (() => {
    if (!product?.variant_attributes) return [];

    return Object.entries(product.variant_attributes)
      .map(([name, origValues]) => {
        let values = [...origValues];

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
                layout={'vertical'}
                mediaList={product.all_images}
                onSelect={(media) => {
                  if (typeof media !== 'number') {
                    setSelectedMedia(media);
                  }
                }}
                selected={selectedMedia}
                selectionMode="object"
                thumbnailSize="xl"
              />
            )}

            {selectedMedia && (
              <MediaMainDisplay index={1} media={selectedMedia} />
            )}

            {window.innerWidth <= 640 && (
              <MediaThumbnails
                layout={'horizontal'}
                mediaList={product.all_images}
                onSelect={(media) => {
                  if (typeof media !== 'number') {
                    setSelectedMedia(media);
                  }
                }}
                selected={selectedMedia}
                selectionMode="object"
                thumbnailSize="xs"
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
                currentPrice={
                  currentVariant?.current_price || product.current_price
                }
                onClick={() => {
                  scrollTo({ target: sectionRef.current });
                }}
                originalPrice={
                  currentVariant?.original_price || product.original_price
                }
                productName={product.product_name}
                reviewCount={product?.rating_summary?.review_count}
              />

              {/* ---------- Product Attribute ---------- */}
              <VariantSelector
                attributeOptions={attributeOptions}
                handleAttributeSelect={handleAttributeSelect}
                handleLinkedVariationSelect={handleLinkedVariationSelect}
                linkedVariationDataMap={linkedVariationDataMap}
                product={product}
                selectedAttributes={selectedAttributes}
                selectedLinkedVariation={selectedLinkedVariation}
              />

              {/* ---------- Stock Status ---------- */}
              <StockStatus
                currentStock={currentStock}
                stockStatus={stockStatus}
              />

              {/* ---------- Add to cart ---------- */}
              <Button
                disabled={stockStatus === 'out_of_stock'}
                endIcon={<ShoppingCart />}
                onClick={() => {
                  setWipIsOpen(true);
                  console.log('Adding to cart:', {
                    variant_id: selectedVariant,
                    quantity: 1,
                  });
                }}
                size="full"
                text="Add to Cart"
                variant="primary"
              />

              {/* ---------- Product Details information ---------- */}
              <ProductInfoPanel
                description={product.description}
                dimensions={currentVariant?.dimensions}
                sku={currentVariant?.sku || product.sku}
              />

              {/* ---------- Review Card ---------- */}
            </div>
          </div>
        </main>
        <div ref={sectionRef}>
          <Reviews
            isLoggedIn={true}
            productId={product.product_id}
            ratingSummary={product.rating_summary}
            reviews={product.reviews}
          />
        </div>
      </div>
      <Modal
        buttons={{
          cancel: {
            text: 'OK',
            onClick() {
              setWipIsOpen(false);
            },
          },
        }}
        isOpen={wipIsOpen}
        message="I'm still developing this feature!"
        title="WIP"
      />
    </>
  );
};
