import { useReducer } from 'react';

import { AppState } from 'interfaces';
import { appReducer } from 'store';
import { AppContext } from './AppContext';
import { SupportedLocales } from 'types';

interface AppProviderProps {
  children: JSX.Element;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const initialState: AppState = {
    locale: 'esES',
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
