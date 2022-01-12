import { useTranslation } from 'react-i18next';

export const useCustomTranslate = () => {
  const { t: translate } = useTranslation();
  const dropdownTranslate = <T extends { [key: number]: string }>(path: string, value: number, object: T): string =>
    translate(`${path}.${object[value]?.toLowerCase()}`);
  return {
    dropdownTranslate,
  };
};
