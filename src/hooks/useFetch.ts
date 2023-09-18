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
    const fetchData = async () => {
      try {
        const result: R = await apiMethod(...params);
        setData(result);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiMethod, ...params]);

  return { data, error, isloading };
};

export default useFetch;
