import { SupportedLocales } from 'types';

export type AppAction = {
  type: '[App] set theme locale';
  payload: { locale: SupportedLocales };
};
