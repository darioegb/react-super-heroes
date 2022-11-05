import { useTranslation } from 'react-i18next';

import { ROWS_PER_PAGE_CONFIG } from 'constant';
import { ErrorMessage } from 'interfaces';
import { isErrorMessage } from 'utils';

export const useCustomTranslate = () => {
  const { t: translate } = useTranslation();
  const dropdownTranslate = <T extends Record<number, string>>(
    path: string,
    value: number,
    object: T,
  ): string => translate(`${path}.${object[value]?.toLowerCase()}`);
  const rowPerPageTranslate = () => [
    ...ROWS_PER_PAGE_CONFIG,
    { value: -1, label: translate('globals.paginationAllOption') },
  ];
  const errorMessageTranslate = (
    error?: ErrorMessage | Record<string, ErrorMessage> | string,
  ) => {
    if (!error) return;
    if (typeof error === 'string') {
      return error;
    }
    const { key, values } = isErrorMessage(error)
      ? error
      : error[Object.keys(error)[0]];
    return translate(key, values);
  };
  return {
    dropdownTranslate,
    rowPerPageTranslate,
    errorMessageTranslate,
  };
};
