import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { useLanguage } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';
type ApiQueryProps<TResponse> = {
  key: unknown[];
  url: any;
  config?: UseQueryOptions<TResponse>;
  enabled?: boolean;
};

export function useApiQuery<TResponse = any>({
  key,
  url,
  config,
  enabled = true,
}: ApiQueryProps<TResponse>) {
  const isQueryEnabled = !!url && enabled;
  const { language } = useLanguage()
  const { authData } = useAuthStore()
  return useQuery<TResponse>({
    queryKey: key,
    staleTime: 1000 * 60 * 2,
    enabled: isQueryEnabled,
    retry: 1,
    queryFn: async () => {
      const { data } = await axios.get<TResponse>(`${API_URL}${url}`, {
        headers: {
        "authorization": `jawJQ${authData?.token}` ,
        "accept-language": language
        }
      });
      return data;
    },
    ...config,
  });
}
