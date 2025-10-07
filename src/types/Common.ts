export type { FC, ReactNode } from 'react';
export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TMaskType = 'phone' | 'cpf' | 'cnpj';
export type TPositionX = 'left' | 'right';
export type TPositionY = 'top' | 'bottom';
export type TCrudFormMode = 'create' | 'update' | 'delete';
export type TOrientation = 'horizontal' | 'vertical';
export type TMediaType = 'image' | 'video';

export interface IMedia {
  media_type: TMediaType;
  url: string;
  id?: number;
  created_at?: string;
}

export interface IFileWithPreview {
  id: string;
  file: File;
  preview: string;
  type: TMediaType;
  name: string;
  size: string;
}

export interface IAttributeOption {
  name: string;
  hasRedirect: boolean;
  values: {
    value: string;
    stock: number;
    available_variants: { variant_id: number; stock: number }[];
    needs_redirect: boolean;
    variant_slug: string;
  }[];
}

export interface IVariant {
  variant_id: number;
  sku: string;
  name: string;
  current_price: number;
  original_price: number;
  stock: number;
  in_stock: boolean;
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
}

export interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  product_slug: string;
  variant_id: number;
  sku: string;
  current_price: number;
  original_price: number;
  stock: number;
  all_images: IMedia[];
  all_variants: IVariant[];
  variant_attributes: {
    [key: string]: {
      value: string;
      stock?: number;
      available_variants?: {
        variant_id: number;
        stock: number;
        sku: string;
        name: string;
        current_price: number;
        original_price: number;
        dimensions: {
          weight: number;
          height: number;
          width: number;
          length: number;
        };
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
    attributes: { [key: string]: string };
  }[];
  category_breadcrumbs: {
    id: number;
    name: string;
    slug: string;
    level: number;
    path: string;
  }[];
  rating_summary: IRatingSummary;
  reviews: IReview[];
}

export interface ICustomer {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
  company_name?: string | null;
  legal_name?: string | null;
  cnpj?: string | null;
  is_cpf?: boolean | null;
}

export interface IReview {
  id: number;
  created_at: string;
  rating: number;
  title: string;
  content: string;
  is_anonymous: boolean;
  positive_votes: number;
  negative_votes: number;
  customer: ICustomer;
  media: IMedia[];
}

export interface IReviewState {
  positiveVotes: number;
  negativeVotes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  isExpanded: boolean;
}

export interface IRatingSummary {
  average_rating: number;
  review_count: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}

export interface IEnhancedReviewCardProps {
  reviews: IReview[];
  isLoggedIn: boolean;
  ratingSummary: IRatingSummary;
  productId: number;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface CrudMethods<T> {
  get: (path?: string) => Promise<T>;
  post: (data: any, path?: string) => Promise<T>;
  patch: (path: string, data: any) => Promise<T>;
  delete: (path: string) => Promise<T>;
}
