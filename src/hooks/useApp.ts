import { useContext } from 'react';

import { AppContext } from 'context';

export const useApp = () => {
  const { appState, setThemeLocale } = useContext(AppContext);
  const { locale } = appState;

  return {
    locale,
    setThemeLocale,
  };
};
