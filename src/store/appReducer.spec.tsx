import { AppState } from 'interfaces';
import { appReducer } from './appReducer';

const initialState: AppState = {
  locale: 'esES',
};

describe('appReducer', () => {
  const locale = 'enUS';

  it('should return default state', () => {
    const state = appReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should set theme locale', () => {
    const state = appReducer(
      { ...initialState },
      { type: '[App] set theme locale', payload: { locale } },
    );
    expect(state.locale).toEqual(locale);
  });
});
