import type { FetchState, CrudMethods } from '../Common';

export interface useFetchParams {
  baseUrl: string;
  defaultOptions?: RequestInit;
}

export interface UseFetchReturn<T> extends FetchState<T>, CrudMethods<T> {}
