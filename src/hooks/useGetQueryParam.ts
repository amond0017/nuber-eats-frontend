import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useGetQueryParam() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
