import { useTranslation } from 'react-i18next';

import { rowsPerPageConfig } from 'constant';

export const useCustomTranslate = () => {
  const { t: translate } = useTranslation();
  const dropdownTranslate = <T extends { [key: number]: string }>(path: string, value: number, object: T): string =>
    translate(`${path}.${object[value]?.toLowerCase()}`);
  const rowPerpageTranslate = () => [...rowsPerPageConfig, { value: -1, label: translate('globals.paginationAllOption') }];  
  return {
    dropdownTranslate,
    rowPerpageTranslate
  };
};
