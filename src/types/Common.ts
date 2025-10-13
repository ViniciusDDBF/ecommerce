import type { ReactNode } from 'react';

export type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MaskType = 'phone' | 'cpf' | 'cnpj';
export type PositionX = 'left' | 'right';
export type PositionY = 'top' | 'bottom';
export type CrudFormMode = 'read' | 'create' | 'update' | 'delete';
export type Orientation = 'horizontal' | 'vertical';
export type MediaType = 'image' | 'video';
export type FirstName = string;
export type LastName = string;
export type Email = string;
export type Text = string | ReactNode;
export type Loading = boolean;
export type Selected = boolean;
export type Disabled = boolean;
export type Value = string;
export type Label = string;
export type Classname = string;
export type Placeholder = string;

export interface SizeMap {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Media {
  media_type: MediaType;
  url: string;
  id?: number;
  created_at?: string;
}

export interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
  type: MediaType;
  name: string;
  file_size: string;
}

export interface AttributeOption {
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

export interface Variant {
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
  all_images: Media[];
  all_variants: Variant[];
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
  rating_summary: RatingSummary;
  reviews: Review[];
}

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

export interface Customer {
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

export interface Review {
  id: number;
  created_at: string;
  rating: number;
  title: string;
  content: string;
  is_anonymous: boolean;
  positive_votes: number;
  negative_votes: number;
  customer: Customer;
  media: Media[];
}

export interface ReviewState {
  positiveVotes: number;
  negativeVotes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  isExpanded: boolean;
}

export interface RatingSummary {
  average_rating: number;
  review_count: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}

export interface ApiFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiCrudMethods<T> {
  get: (path?: string) => Promise<T>;
  post: (data: unknown, path?: string) => Promise<T>;
  patch: (path: string, data: unknown) => Promise<T>;
  delete: (path: string) => Promise<T>;
}
