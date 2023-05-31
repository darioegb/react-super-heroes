import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpMethod } from 'types';
export interface FetchConfig<T>
  extends AxiosRequestConfig<T>,
  ErrorHandlingOptions {
  instance?: AxiosInstance;
}

export interface FetchResponse<T> {
  isError: boolean;
  data?: T | T[];
  count?: number;
}

export interface ErrorHandlingOptions {
  showErrorMessage?: boolean;
  resourceName?: string;
}

export interface ErrorHandlingResult {
  handleError: (method: HttpMethod, value: string) => void;
}