import type { ApiCrudMethods, ApiFetchState } from '@/types';

export interface useFetchParams {
  baseUrl: string;
  defaultOptions?: RequestInit;
}

export interface UseFetchReturn<T>
  extends ApiFetchState<T>,
    ApiCrudMethods<T> {}
