import { useTranslation } from 'react-i18next';

import { GlobalLoader, Navbar } from 'components';
import { LOCALES } from 'constant';
import { useAxiosLoader } from 'hooks';
import './index.scss';

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { t: translate } = useTranslation();
  const [loading] = useAxiosLoader();

  return (
    <>
      <Navbar
        localesLabelPath="globals.locales"
        title={translate('globals.title')}
        locales={LOCALES}
      />
      <GlobalLoader loading={loading} />
      <main className="body">{children}</main>
    </>
  );
};
