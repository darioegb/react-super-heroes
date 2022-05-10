import { useTranslation } from 'react-i18next';

export const Title = () => {
  const { t: translate } = useTranslation();

  return <h1>{translate('globals.title')}</h1>;
};
