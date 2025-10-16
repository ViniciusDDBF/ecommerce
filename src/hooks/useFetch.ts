import type { UseFetchReturn, useFetchParams } from '@/types';
import React, { useCallback } from 'react';

/**
 * React hook for performing CRUD requests with built-in loading and error state.
 *
 * @param baseUrl - Base URL for all requests.
 * @param defaultOptions - Optional default fetch configuration (e.g., headers).
 * @returns Object containing data, loading, error, and CRUD request methods.
 *
 * @example
 * ```ts
 * const { get, post, data, loading, error } = useFetch<User>('/api/users');
 *
 * const loadUsers = async () => {
 *   const users = await get();
 *   console.log(users);
 * };
 * ```
 */

export const useFetch = <T>({
  baseUrl,
  defaultOptions,
}: useFetchParams): UseFetchReturn<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const defaultOptionsRef = React.useRef(defaultOptions);
  defaultOptionsRef.current = defaultOptions;

  const buildUrl = useCallback(
    (path?: string): string => {
      if (!path) return baseUrl;
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      return `${cleanBase}/${cleanPath}`;
    },
    [baseUrl],
  );

  const makeRequest = useCallback(
    async (
      method: string,
      path?: string,
      body?: unknown,
      customOptions?: RequestInit,
    ): Promise<T> => {
      const controller = new AbortController();
      const { signal } = controller;

      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(path);
        const options: RequestInit = {
          method,
          signal,
          ...defaultOptionsRef.current,
          ...customOptions,
        };

        if (body && (method === 'POST' || method === 'PATCH')) {
          options.body = JSON.stringify(body);
          if (!options.headers) {
            options.headers = {};
          }
          const headers = options.headers as Record<string, string>;
          if (!headers['Content-Type'] && !headers['content-type']) {
            headers['Content-Type'] = 'application/json';
          }
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        let responseData: T;

        if (contentType?.includes('application/json')) {
          const text = await response.text();
          responseData = text ? (JSON.parse(text) as T) : (null as T);
        } else {
          responseData = null as T;
        }

        if (!signal.aborted) {
          setData(responseData);
        }

        return responseData;
      } catch (err) {
        if (!controller.signal.aborted) {
          const errorMessage =
            err instanceof Error ? err.message : 'Unknown error occurred';
          setError(errorMessage);
          throw err;
        }
        throw err;
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [buildUrl],
  );

  const get = React.useCallback(
    (path?: string): Promise<T> => makeRequest('GET', path),
    [makeRequest],
  );

  const post = React.useCallback(
    (data: unknown, path?: string): Promise<T> =>
      makeRequest('POST', path, data),
    [makeRequest],
  );

  const patch = React.useCallback(
    (path: string, data: unknown): Promise<T> =>
      makeRequest('PATCH', path, data),
    [makeRequest],
  );

  const del = React.useCallback(
    (path: string): Promise<T> => makeRequest('DELETE', path),
    [makeRequest],
  );

  return {
    data,
    loading,
    error,
    get,
    post,
    patch,
    delete: del,
  };
};
