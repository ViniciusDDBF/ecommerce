import type { CrudMethods, FetchState } from '@/types';

export interface useFetchParams {
  baseUrl: string;
  defaultOptions?: RequestInit;
}

export interface UseFetchReturn<T> extends FetchState<T>, CrudMethods<T> {}
