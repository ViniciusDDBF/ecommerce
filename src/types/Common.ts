import type { ReactNode } from 'react';

export type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

export interface Address {
  address_id: number;
  address_name: string;
  city: string;
  complement: string | null;
  country: string;
  customer_id: number;
  is_default: boolean;
  neighborhood: string;
  number: string;
  postal_code: string;
  recipient_name: string;
  state: string;
  street: string;
  user_id: string;
}
export interface ApiCrudMethods<T> {
  delete: (path: string) => Promise<T>;
  get: (path?: string) => Promise<T>;
  patch: (path: string, data: unknown) => Promise<T>;
  post: (data: unknown, path?: string) => Promise<T>;
}
export interface ApiFetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
export interface AttributeOption {
  hasRedirect: boolean;
  name: string;
  values: {
    value: string;
    stock: number;
    available_variants: { variant_id: number; stock: number }[];
    needs_redirect: boolean;
    variant_slug: string;
  }[];
}
export type Classname = string;
export type CrudFormMode = 'read' | 'create' | 'update' | 'delete';
export interface Customer {
  cnpj?: string | null;
  company_name?: string | null;
  cpf?: string | null;
  email?: string | null;
  first_name?: FirstName;
  id: string;
  is_cpf?: boolean | null;
  last_name?: LastName;
  legal_name?: string | null;
  name?: string;
  phone?: string | null;
}
export type Disabled = boolean;
export type Email = string;
export interface FileWithPreview {
  file: File;
  file_size: string;
  id: string;
  name: string;
  preview: string;
  type: MediaType;
}
export type FirstName = string;
export type Label = string;
export type LastName = string;
export type Loading = boolean;
export type MaskType = 'phone' | 'cpf' | 'cnpj';
export interface Media {
  created_at?: string;
  id?: number;
  media_type: MediaType;
  url: string;
}
export type MediaType = 'image' | 'video';
export type Orientation = 'horizontal' | 'vertical';

export type Placeholder = string;

export type PositionX = 'left' | 'right';

export type PositionY = 'top' | 'bottom';

export interface Product {
  all_images: Media[];
  all_variants: Variant[];
  category_breadcrumbs: {
    id: number;
    name: string;
    slug: string;
    level: number;
    path: string;
  }[];
  current_price: number;
  description: string;
  linked_variations: {
    product_name: string;
    product_slug: string;
    variant_id: number;
    primary_image_url: string;
    primary_image_media_type: string;
    attributes: { [key: string]: string };
  }[];
  original_price: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  rating_summary: RatingSummary;
  reviews: Review[];
  sku: string;
  stock: number;
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
  variant_id: number;
}

export interface RatingSummary {
  average_rating: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  review_count: number;
}

export interface Review {
  content: string;
  created_at: string;
  customer: Customer;
  id: number;
  is_anonymous: boolean;
  media: Media[];
  negative_votes: number;
  positive_votes: number;
  rating: number;
  title: string;
}

export interface ReviewState {
  hasDisliked: boolean;
  hasLiked: boolean;
  isExpanded: boolean;
  negativeVotes: number;
  positiveVotes: number;
}

export type Selected = boolean;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SizeMap {
  lg: string;
  md: string;
  sm: string;
  xl: string;
  xs: string;
}

export type Text = string | ReactNode;

export interface User {
  addresses: Address[];
  cnpj: string | null;
  company_name: string | null;
  cpf: string | null;
  customer_id: number;
  email: string;
  first_name: string | null;
  is_cpf: boolean;
  last_name: string | null;
  legal_name: string | null;
  phone: string;
  user_id: string;
}

export type Value = string;

export interface Variant {
  attributes: {
    attribute_name: string;
    attribute_value: string;
    attribute_id: number;
    value_id: number;
  }[];
  current_price: number;
  dimensions: {
    weight: number;
    height: number;
    width: number;
    length: number;
  };
  in_stock: boolean;
  name: string;
  original_price: number;
  sku: string;
  stock: number;
  variant_id: number;
}
