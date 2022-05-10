import { AppState } from 'interfaces';
import { AppAction } from './appAction';

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case '[App] set theme locale':
      return {
        ...state,
        locale: action.payload.locale,
      };

    default:
      return state;
  }
};
