import { Key } from 'react';
import { Order } from 'types';

export interface Column<T> {
  id: keyof T & Key;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  isImg?: boolean;
}

export interface PageConfig<T> {
  page: number;
  rowsPerPage: number;
  orderBy: keyof T | 'id';
  order: Order;
  filter: string;
}
