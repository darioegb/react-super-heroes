import { SnackbarOrigin } from 'notistack';
import { esES, enUS } from '@mui/material/locale';

import { PageConfig } from 'interfaces';

export const idKey = 'id';
export const httpMethodKeys = {
  get: 'get',
  delete: 'delete',
  post: 'create',
  put: 'update',
};
export const rowsPerPageConfig = [5, 10, 15, 20, 30, 50, 100];
export const defaultPageConfig: PageConfig<unknown> = {
  page: 0,
  rowsPerPage: 5,
  orderBy: 'id',
  order: 'asc',
  filter: '',
};
export const regExp = {
  alphabet: /^[A-Za-z ]*$/,
};
export const anchorOrigin: SnackbarOrigin = {
  horizontal: 'right',
  vertical: 'top',
};
export const pictureBasePath = 'pictures';
export const defaultFormControlSizes = {
  text: {
    min: 3,
    max: 60,
  },
  email: {
    min: 10,
    max: 100,
  },
  number: {
    min: 1,
    max: 999_999_999,
  },
  textarea: {
    min: 10,
    max: 250,
  },
};

export const locales = { esES, enUS };

