import { renderHook } from '@testing-library/react-hooks';
import { SuperHeroProvider } from 'features/super-hero/context';

import { useSuperHero } from './useSuperHero';

describe('useSuperHero', () => {
  const wrapper = ({ children }: any) => <SuperHeroProvider>{children}</SuperHeroProvider>;

  it('should return false when not exist http request', () => {
    const { result } = renderHook(() => useSuperHero(), { wrapper });
    const { pageConfig, selectedSuperHero, superHeroes, columns, dispatch, onDelete, onAddOrEditOrView } =
      result.current;
    expect(typeof onDelete).toBe('function');
    expect(typeof onAddOrEditOrView).toBe('function');
    expect(typeof dispatch).toBe('function');
    expect(pageConfig).toBeDefined();
    expect(selectedSuperHero).toBeNull();
    expect(superHeroes.length).toBe(0);
    expect(columns).toBeDefined();
  });
});
