import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLoaderData } from 'react-router-dom';
import parseVariantHash from '../utils/variants/parseVariantHash';
import getUpdatedVariantParams from '../utils/variants/getUpdatedVariantParams';
import ProductMediaViewer from '../components/product/ProductMediaViewer';
import Breadcrumbs from '../components/product/Breadcrumbs';
import ProductHeader from '../components/product/ProductHeader';
import VariantSelector from '../components/product/VariantSelector';
import StockStatus from '../components/product/StockStatus';
import ProductInfoPanel from '../components/product/ProductInfoPanel';
import Button from '../components/Button';
import { ShoppingCart } from 'lucide-react';

// Consolidated interfaces (unchanged)
export interface Product {
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

  const updateUrlWithVariant = (attributes: { [key: string]: string }) => {
    const newSearchParams = getUpdatedVariantParams(attributes, searchParams);

    if (searchParams.get('variant') !== newSearchParams.get('variant')) {
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const initializeDefaultVariant = () => {
    if (!product) return;
    const defaultVariant = product.all_variants[0];

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
    if (!product) return;
    if (!Object.keys(selectedAttributes).length) {
      return isInitialized ? product.all_variants[0] : undefined;
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

  /* ---------- Initialize state from URL on mount ---------- */
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

  /* ---------- Set default image ---------- */
  useEffect(() => {
    if (product?.all_images?.length && !selectedMedia) {
      setSelectedMedia(product.all_images[0]);
    }
  }, [product?.all_images, selectedMedia]);

  /* ---------- Update selected attributes when variant changes ---------- */
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

  if (!isInitialized || !product) return null;

  return (
    <div className="bg-charcoal-800 text-charcoal-300 min-h-screen font-sans">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-10 xl:gap-12">
          <ProductMediaViewer
            images={product.all_images}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
            productName={product.product_name}
          />
          <div className="w-full space-y-4 sm:space-y-6 lg:w-1/2 lg:space-y-8">
            <Breadcrumbs
              breadcrumbs={product.category_breadcrumbs}
              navigate={navigate}
            />
            <ProductHeader
              productName={product.product_name}
              description={product.description}
              currentPrice={
                currentVariant?.current_price || product.current_price
              }
              originalPrice={
                currentVariant?.original_price || product.original_price
              }
            />
            <VariantSelector
              attributeOptions={attributeOptions}
              selectedAttributes={selectedAttributes}
              handleAttributeSelect={handleAttributeSelect}
              handleLinkedVariationSelect={handleLinkedVariationSelect}
              linkedVariationDataMap={linkedVariationDataMap}
              product={product}
              selectedLinkedVariation={selectedLinkedVariation}
            />
            <StockStatus
              stockStatus={stockStatus}
              currentStock={currentStock}
            />
            <Button
              text="Add to Cart"
              variant="primary"
              size="full"
              endIcon={<ShoppingCart />}
              disabled={stockStatus === 'out_of_stock'}
              onClick={() => {
                console.log('Adding to cart:', {
                  variant_id: selectedVariant,
                  quantity: 1,
                });
              }}
            />

            <ProductInfoPanel
              sku={currentVariant?.sku || product.sku}
              dimensions={currentVariant?.dimensions}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
