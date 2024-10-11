import React, { useEffect } from 'react'

interface Props<T, P extends {}> {
  fn: (params: P) => Promise<T>;
  params?: P;
}

export default function useSimpleQuery<T, P extends {}>({ fn, params }: Props<T, P>) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState(null);
  const latestRequest = React.useRef(0);

  async function query() {
    setLoading(true);
    const requestId = ++latestRequest.current;

    try {
      const data = await fn(params || ({} as P));

      if (requestId === latestRequest.current) {
        setData(data);
        setError(null);
      }
    } catch (error: any) {
      if (requestId === latestRequest.current) {
        setError(error);
        setData(undefined);
      }
    } finally {
      if (requestId === latestRequest.current) {
        setLoading(false);
      }
    }
  }


  useEffect(() => {
    query();
  }, [params]);

  return {
    loading,
    data,
    error,
  }
}
