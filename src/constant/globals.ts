import { SnackbarOrigin } from 'notistack';
import { esES, enUS } from '@mui/material/locale';

import { PageConfig } from 'interfaces';

export const ID_KEY = 'id';
export const HTTP_METHOD_KEYS = {
  get: 'get',
  delete: 'delete',
  post: 'create',
  put: 'update',
};
export const ROWS_PER_PAGE_CONFIG = [5, 10, 15, 20, 30, 50, 100];
export const DEFAULT_PAGE_CONFIG: PageConfig<unknown> = {
  page: 0,
  rowsPerPage: 5,
  orderBy: 'id',
  order: 'asc',
  filter: '',
};
export const REG_EXP = {
  alphabet: /^[A-Za-z ]*$/,
};
export const ANCHOR_ORIGIN: SnackbarOrigin = {
  horizontal: 'right',
  vertical: 'top',
};
export const PICTURE_BASE_PATH = 'pictures';
export const DEFAULT_FORM_CONTROL_SIZES = {
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

export const LOCALES = { esES, enUS };
