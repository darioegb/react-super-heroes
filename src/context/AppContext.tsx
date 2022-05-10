import { createContext } from 'react';

import { AppState } from 'interfaces';
import { SupportedLocales } from 'types';

export type AppContextProps = {
  appState: AppState;
  setThemeLocale: (locale: SupportedLocales) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
