import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { useLanguage } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';

type HttpMethod = 'post' | 'put' | 'delete';

type ApiMutationProps<TInput, TResponse> = {
  url: string;
  method?: HttpMethod;
  config?: UseMutationOptions<TResponse, unknown, TInput>;
  isFormData?: boolean;
  refetchKeys?: (string | unknown[])[]; // << هنا نضيف المفاتيح التي تريد عمل refetch لها
};

export function useApiMutation<TInput = any, TResponse = any>({
  url,
  method = 'post',
  config,
  isFormData = false,
  refetchKeys = [],
}: ApiMutationProps<TInput, TResponse>) {
  const { language } = useLanguage();
  const { authData } = useAuthStore();
  const queryClient = useQueryClient(); // نستخدمه لإعادة الجلب

  return useMutation<TResponse, Error, TInput>({
    mutationFn: async (body: TInput) => {
      const headers: Record<string, string> = {
        'accept-language': language,
        Accept: 'application/json',
      };

      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      if (authData?.token) {
        headers['authorization'] = `jawJQ${authData.token}`;
      }

      const axiosConfig = {
        headers,
      };

      const fullUrl = `${API_URL}${url}`;
      let response;

      switch (method) {
        case 'put':
          response = await axios.put(fullUrl, body, axiosConfig);
          break;
        case 'delete':
          response = await axios.delete(fullUrl, {
            ...axiosConfig,
            data: body,
          });
          break;
        case 'post':
        default:
          response = await axios.post(fullUrl, body, axiosConfig);
          break;
      }

      return response.data;
    },

    onSuccess: (data, variables, context) => {
      // invalidate queries by refetchKeys
      refetchKeys.forEach((key: string | unknown[]) => {
        queryClient.invalidateQueries({ queryKey: key as readonly unknown[] });
      });

      config?.onSuccess?.(data, variables, context);
    },

    ...config,
  });
}
