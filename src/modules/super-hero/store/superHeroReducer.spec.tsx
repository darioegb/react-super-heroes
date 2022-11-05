import { DEFAULT_PAGE_CONFIG, GenreEnum } from 'constant';
import { SuperHeroState } from 'modules/super-hero/interfaces/superHero';
import { superHeroReducer } from './superHeroReducer';

const initialState: SuperHeroState = {
  superHeroes: [],
  selectedSuperHero: undefined,
  pageConfig: DEFAULT_PAGE_CONFIG,
};

describe('superHeroReducer', () => {
  const mockSuperHero = {
    name: 'test',
    genre: GenreEnum.Male,
    specialty: 'test superHero',
  };

  it('should return default state', () => {
    const state = superHeroReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should add to superHeroes list a new superHero on create action', () => {
    const state = superHeroReducer(initialState, {
      type: '[SuperHero] create',
      payload: { superHero: mockSuperHero },
    });
    expect(state.superHeroes.length).toBe(1);
  });

  it('should update superHeroes list on update action', () => {
    const newSpecialty = 'test superHero updated';
    const state = superHeroReducer(
      { ...initialState, superHeroes: [mockSuperHero] },
      {
        type: '[SuperHero] update',
        payload: { superHero: { ...mockSuperHero, specialty: newSpecialty } },
      },
    );
    expect(state.superHeroes[0].specialty).toBe(newSpecialty);
  });

  it('should remove superHeroes from list on remove action', () => {
    const state = superHeroReducer(
      { ...initialState, superHeroes: [{ ...mockSuperHero, id: '1' }] },
      {
        type: '[SuperHero] delete',
        payload: { id: '1' },
      },
    );
    expect(state.superHeroes.length).toBe(0);
  });

  it('should get page superHeroes on get page action', () => {
    const state = superHeroReducer(initialState, {
      type: '[SuperHero] get page',
      payload: { superHeroes: [mockSuperHero] },
    });
    expect(state.superHeroes.length).toBe(1);
  });

  it('should set selected superHeroe on set selected action', () => {
    const state = superHeroReducer(
      { ...initialState, superHeroes: [mockSuperHero] },
      {
        type: '[SuperHero] set selected',
        payload: { superHero: mockSuperHero },
      },
    );
    expect(state.selectedSuperHero).toEqual(mockSuperHero);
  });

  it('should set page config on set page config action', () => {
    const newPage = { ...initialState.pageConfig, page: 1 };
    const state = superHeroReducer(initialState, {
      type: '[SuperHero] set page config',
      payload: { pageConfig: newPage },
    });
    expect(state.pageConfig).toEqual(newPage);
  });
});
