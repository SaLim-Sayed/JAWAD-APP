import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { useLanguage } from '@/store';
type ApiMutationProps<TInput, TResponse> = {
  url: string;
  config?: UseMutationOptions<TResponse, unknown, TInput>;
  method?: 'post' | 'put' | 'delete';
};

export function useApiMutation<TInput = any, TResponse = any>({
  url,
  config,
  method = 'post',
}: ApiMutationProps<TInput, TResponse>) {
const {language}=useLanguage()

  return useMutation<TResponse, Error, TInput>({
    mutationFn: async (body) => {
      let response;

      if (method === 'delete') {
        response = await axios.delete(`${API_URL}${url}`, { data: body });
      } else {
        response = await axios[method](`${API_URL}${url}`, body,{
          headers:{
            "accept-language": language
          }
        });
      }

      return response.data;
    },
    
    ...config,
  });
}
