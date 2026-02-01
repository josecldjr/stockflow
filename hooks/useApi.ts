import { useState, useCallback, useRef, useEffect } from 'react';
import type { ApiError } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | void>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Keep a ref to the latest API function to avoid stale closures
  const apiFunctionRef = useRef(apiFunction);
  useEffect(() => {
    apiFunctionRef.current = apiFunction;
  }, [apiFunction]);

  const execute = useCallback(async (...args: any[]) => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await apiFunctionRef.current(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

