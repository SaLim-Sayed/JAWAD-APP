import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useLanguage } from '@/store';
import { API_URL } from './api';
import { useAuthStore } from '@/store/useAuthStore';

type UsePutMutationOptions<T> = {
  endpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enabledToast?: boolean;
};

export const usePutMutation = <T = any>({
  endpoint,
  onSuccess,
  onError,
  enabledToast = true,
}: UsePutMutationOptions<T>) => {
  const { language } = useLanguage();

  const { authData } = useAuthStore()
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'accept-language': language,
      'authorization': `jawJQ${authData?.token}`,
    },
  });

  return useMutation({
    mutationFn: async (formData: FormData | object) => {
      const response = await axiosInstance.put(endpoint, formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (enabledToast) {
        console.log('✅ PUT Success:', data);
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      if (enabledToast) {
        console.error('❌ PUT Error:', error);
      }
      onError?.(error);
    },
  });
};
