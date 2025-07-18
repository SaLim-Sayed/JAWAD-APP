import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
};

export function useApiMutation<TInput = any, TResponse = any>({
  url,
  method = 'post',
  config,
  isFormData = false,
}: ApiMutationProps<TInput, TResponse>) {
  const { language } = useLanguage();
  const { authData } = useAuthStore();

  return useMutation<TResponse, Error, TInput>({
    mutationFn: async (body: TInput) => {
      const headers: Record<string, string> = {
        'accept-language': language,
        Accept: 'application/json',
      };

      // Override Content-Type only if it's not FormData (axios sets it automatically for FormData)
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
            data: body, // send body in delete
          });
          break;
        case 'post':
        default:
          response = await axios.post(fullUrl, body, axiosConfig);
          break;
      }

      return response.data;
    },

    ...config,
  });
}
