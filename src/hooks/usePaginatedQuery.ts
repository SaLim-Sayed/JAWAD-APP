import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "./api";
type PaginatedQueryOptions<T> = {
  key: string[];
  url: string;
  limit?: number;
};

export function usePaginatedQuery<T>({
  key,
  url,
  limit = 10,
}: PaginatedQueryOptions<T>) {
  return useInfiniteQuery<T>({
    queryKey: key,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get(
        `${API_URL}${url}?limit=${limit}&skip=${pageParam}`
      );
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages: T[]) => {
      const totalFetched = allPages.reduce(
        (sum: number, page: any) => sum + page.products.length,
        0
      );
      return totalFetched < lastPage.total ? totalFetched : undefined;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
}
