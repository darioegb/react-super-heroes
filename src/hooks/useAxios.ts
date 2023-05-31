import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

import { FetchConfig, FetchResponse } from 'interfaces';
import { useErrorHandling } from './useErrorHandling';
import { HttpMethod } from 'types';

export const useAxios = <T>(defaultInstance: AxiosInstance) => {
  const { handleError } = useErrorHandling();

  const exec = useCallback(
    async ({
      url,
      method,
      data,
      instance = defaultInstance,
      ...config
    }: FetchConfig<T>): Promise<FetchResponse<T>> => {
      try {
        const response = await instance.request<T>({
          url,
          method,
          data,
          ...config,
        });
        return {
          isError: false,
          data: response.data,
          count: response.headers
            ? Number(response.headers['x-total-count'])
            : undefined,
        };
      } catch (error) {
        config.showErrorMessage &&
          handleError(method as HttpMethod, config.resourceName ?? '');
        return { isError: true };
      }
    },
    [defaultInstance, handleError],
  );

  return { exec };
};
