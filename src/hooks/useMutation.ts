/* eslint-disable no-unused-vars */
'use client';
import { useEffect, useRef, useState } from 'react';

type MutateFn<T> = (value?: any) => Promise<T>;
type Callback<T> = (value?: T) => void;

function useHandler<T>(
  mutate: MutateFn<T>,
  onSuccess?: Callback<T>,
  onError?: Callback<unknown>,
  startLoading?: boolean,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(startLoading);
  const [hasError, setHasError] = useState(false);

  const run = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await mutate();
      setData(data);
      onSuccess?.(data);
    } catch (error) {
      setHasError(true);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, hasError, run };
}

export function useMutation<T = any>({
  mutate,
  onSuccess,
  onError,
}: {
  mutate: MutateFn<T>;
  onSuccess?: Callback<T>;
  onError?: Callback<unknown>;
}) {
  const { data, isLoading, hasError, run } = useHandler(mutate, onSuccess, onError);
  return { data, isLoading, hasError, runMutation: run };
}

export function useAutoFetch<T = any>({
  mutate,
  onSuccess,
  onError,
}: {
  mutate: MutateFn<T>;
  onSuccess?: Callback<T>;
  onError?: Callback<unknown>;
}) {
  const { data, isLoading, hasError, run } = useHandler(mutate, onSuccess, onError, true);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    run();
  }, [mutate, run]);

  const onRefetch = () => {
    run();
  };

  return { data, isLoading, hasError, onRefetch };
}
