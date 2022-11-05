import { AxiosRequestConfig } from 'axios';

import { FetchConfig, FetchResponse } from 'interfaces';

export const fetch = <T>({
  instance,
  url,
  method,
  data: requestData,
  config,
}: FetchConfig<T>): Promise<FetchResponse<T>> => {
  return ['post', 'put', 'patch'].includes(method)
    ? instance[method](
        url,
        requestData as T & AxiosRequestConfig<T>,
        config as AxiosRequestConfig<T>,
      )
    : instance[method](url, config as unknown as T & AxiosRequestConfig<T>)
        .then((response) => ({
          isError: false,
          ...(response.data && { data: response.data }),
          // x-total-change if parameter for json server can be changed
          count: response.headers
            ? +(response.headers as Record<string, string>)['x-total-count']
            : undefined,
        }))
        .catch(() => ({ isError: true }));
};
