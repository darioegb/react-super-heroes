import { SuperHeroState } from 'modules/super-hero/interfaces/superHero';
import { SuperHeroAction } from './superHeroAction';

export const superHeroReducer = (
  state: SuperHeroState,
  action: SuperHeroAction,
): SuperHeroState => {
  switch (action.type) {
    case '[SuperHero] create':
      return {
        ...state,
        superHeroes: [...state.superHeroes, action.payload.superHero],
      };

    case '[SuperHero] update':
      return {
        ...state,
        superHeroes: state.superHeroes.map(({ ...superHero }) =>
          superHero.id === action.payload.superHero.id
            ? action.payload.superHero
            : superHero,
        ),
      };

    case '[SuperHero] delete':
      return {
        ...state,
        superHeroes: state.superHeroes.filter(
          ({ ...superHero }) =>
            superHero.id && superHero.id !== action.payload.id,
        ),
        selectedSuperHero: undefined,
      };

    case '[SuperHero] get page':
      return {
        ...state,
        superHeroes: [...action.payload.superHeroes],
        selectedSuperHero: undefined,
      };

    case '[SuperHero] set selected':
      return {
        ...state,
        selectedSuperHero: { ...action.payload.superHero },
      };

    case '[SuperHero] set page config':
      return {
        ...state,
        pageConfig: { ...action.payload.pageConfig },
      };

    default:
      return state;
  }
};
