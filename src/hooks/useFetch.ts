import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: AxiosError | null;
  isloading: boolean;
}

type ApiMethod<R, P extends any[]> = (...args: P) => Promise<R>;

const useFetch = <R, P extends any[]>(
  apiMethod: ApiMethod<R, P>,
  ...params: P
): ApiResponse<R> => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isloading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true); // Reset the loading state for every new fetch.

      try {
        const result: R = await apiMethod(...params);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as AxiosError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Unsubscribe from the effect when component unmounts.
    };
  }, [apiMethod, ...params]);

  return { data, error, isloading };
};

export default useFetch;
