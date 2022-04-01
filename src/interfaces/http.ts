import { AxiosInstance } from 'axios';
import { HttpMethod, Order } from 'types';

export interface ServerPaginationConfig {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: Order;
  name_like?: string;
}

export interface HttpConfig {
  headers?: Record<string, string | number | boolean>;
  params?: ServerPaginationConfig;
}

export interface FetchConfig<T> {
  instance: AxiosInstance;
  url: string;
  method: HttpMethod;
  data?: T;
  config?: HttpConfig;
}

export interface FetchResponse<T> {
  isError: boolean;
  data?: T;
  count?: number;
}
