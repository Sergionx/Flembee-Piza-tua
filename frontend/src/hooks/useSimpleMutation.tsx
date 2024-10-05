import { useState } from "react";

interface Props<T> {
  fn: () => Promise<T>;
}

export default function useSimpleMutation<T>({ fn }: Props<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  async function mutate() {
    setLoading(true);
    try {
      setData(await fn());
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  }

  return { loading, data, error, mutate };
}
