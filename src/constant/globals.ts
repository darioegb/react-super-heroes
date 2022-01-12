import { ObjectIndexer, PageConfig } from 'interfaces';
import { SnackbarOrigin } from 'notistack';

export const idKey = 'id';
export const httpMethodKeys = {
  get: 'get',
  delete: 'remove',
  post: 'create',
  put: 'update',
};
export const rowsPerPageConfig = [5, 10, 15, 20];
export const defaultPageConfig: PageConfig<ObjectIndexer<any>> = {
  page: 0,
  rowsPerPage: 5,
  orderBy: 'id',
  order: 'asc',
  filter: '',
};
export const regExp = {
  alphabet: /^[A-Za-z ]*$/,
};
export const anchorOrigin: SnackbarOrigin = { horizontal: 'right', vertical: 'top' };
