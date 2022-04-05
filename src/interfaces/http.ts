import { AxiosInstance } from 'axios';
import { HttpMethod } from 'types';
export interface FetchConfig<T> {
  instance: AxiosInstance;
  url: string;
  method: HttpMethod;
  data?: T;
  config?: Record<string, Record<string, unknown>>;
}

export interface FetchResponse<T> {
  isError: boolean;
  data?: T;
  count?: number;
}
