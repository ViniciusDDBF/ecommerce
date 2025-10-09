export type { FC, ReactNode } from 'react';
export type Tsize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TmaskType = 'phone' | 'cpf' | 'cnpj';
export type TpositionX = 'left' | 'right';
export type TpositionY = 'top' | 'bottom';
export type TcrudFormMode = 'create' | 'update' | 'delete';
export type Torientation = 'horizontal' | 'vertical';
export type TmediaType = 'image' | 'video';

export interface IsizeObject {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Imedia {
  media_type: TmediaType;
  url: string;
  id?: number;
  created_at?: string;
}

export interface IfileWithPreview {
  id: string;
  file: File;
  preview: string;
  type: TmediaType;
  name: string;
  size: string;
}

export interface IattributeOption {
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

export interface Ivariant {
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

export interface Iproduct {
  product_id: number;
  product_name: string;
  description: string;
  product_slug: string;
  variant_id: number;
  sku: string;
  current_price: number;
  original_price: number;
  stock: number;
  all_images: Imedia[];
  all_variants: Ivariant[];
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
  rating_summary: IratingSummary;
  reviews: Ireview[];
}

export interface Icustomer {
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

export interface Ireview {
  id: number;
  created_at: string;
  rating: number;
  title: string;
  content: string;
  is_anonymous: boolean;
  positive_votes: number;
  negative_votes: number;
  customer: Icustomer;
  media: Imedia[];
}

export interface IreviewState {
  positiveVotes: number;
  negativeVotes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  isExpanded: boolean;
}

export interface IratingSummary {
  average_rating: number;
  review_count: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}

export interface IEnhancedReviewCardProps {
  reviews: Ireview[];
  isLoggedIn: boolean;
  ratingSummary: IratingSummary;
  productId: number;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface CrudMethods<T> {
  get: (path?: string) => Promise<T>;
  post: (data: unknown, path?: string) => Promise<T>;
  patch: (path: string, data: unknown) => Promise<T>;
  delete: (path: string) => Promise<T>;
}
