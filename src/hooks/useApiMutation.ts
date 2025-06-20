import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

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
  return useMutation<TResponse, Error, TInput>({
    mutationFn: async (body) => {
      let response;

      if (method === 'delete') {
        response = await axios.delete(url, { data: body });
      } else {
        response = await axios[method](url, body);
      }

      return response.data;
    },
    ...config,
  });
}
