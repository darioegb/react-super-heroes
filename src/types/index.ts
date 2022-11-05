import { LOCALES } from 'constant';

export type StringOrNumber = string | number;
export type Order = 'asc' | 'desc';
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type SupportedLocales = keyof typeof LOCALES;
