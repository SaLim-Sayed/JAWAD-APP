import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios'; // import AxiosError for typing
import { API_URL } from './api';
import { useLanguage } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';

type HttpMethod = 'post' | 'put' | 'delete';

type ApiMutationProps<TInput, TResponse> = {
  url: string;
  method?: HttpMethod;
  config?: UseMutationOptions<TResponse, unknown, TInput>;
  isFormData?: boolean;
  refetchKeys?: (string | unknown[])[];
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
  const queryClient = useQueryClient();

  return useMutation<TResponse, AxiosError<any>, TInput>({
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

      const axiosConfig = { headers };
      const fullUrl = `${API_URL}${url}`;
      let response;

      switch (method) {
        case 'put':
          response = await axios.put(fullUrl, body, axiosConfig);
          break;
        case 'delete':
          response = await axios.delete(fullUrl, { ...axiosConfig, data: body });
          break;
        case 'post':
        default:
          response = await axios.post(fullUrl, body, axiosConfig);
          break;
      }

      return response.data;
    },

    onSuccess: (data, variables, context) => {
      refetchKeys.forEach((key: string | unknown[]) => {
        queryClient.invalidateQueries({ queryKey: key as readonly unknown[] });
      });

      config?.onSuccess?.(data, variables, context);
    },

    onError: (error: AxiosError<any>, variables, context) => {
       let errorMessage = error.message;

      if (error.response?.data) {
         if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message ) {
          errorMessage = error.response.data.message as string;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      }

      const enhancedError = new Error(errorMessage);
      Object.assign(enhancedError, error);
      config?.onError?.(enhancedError, variables, context);
    },

    ...config,
  });
}