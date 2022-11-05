import { useReducer } from 'react';

import { AppState } from 'interfaces';
import { appReducer } from 'store';
import { AppContext } from './AppContext';
import { SupportedLocales } from 'types';
import { LOCALES } from 'constant';

interface AppProviderProps {
  children: JSX.Element;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const initialState: AppState = {
    locale:
      (Object.keys(LOCALES).find((key: string) =>
        key.startsWith(localStorage.getItem('lang') as string),
      ) as SupportedLocales) || 'enUS',
  };
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const setThemeLocale = (locale: SupportedLocales) =>
    dispatch({
      type: '[App] set theme locale',
      payload: { locale },
    });

  return (
    <AppContext.Provider value={{ appState, setThemeLocale }}>
      {children}
    </AppContext.Provider>
  );
};
