import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShortLinkPage() {
  // get the params
  const params = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading, error } = useQuery({
    queryKey: ["shortId", params.shortId],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/v1/${params.shortId}`);
      const data = await response.json();
      if (!("link" in data)) {
        throw new Error(data.message);
      }
      return data ?? null;
    },
  });
  useEffect(() => {
    if (data) {
      window.location.href = data.link;
    }
  }, [data, params]);

  return (
    <div className="flex h-screen w-screen items-center justify-center text-white">
      {isLoading && <>Loading...</>}
      <div className="text-red-500">{error && error.message}</div>
    </div>
  );
}
