import { render } from '@testing-library/react';

import { SuperHeroGridItemList } from './SuperHeroGridItemList';
import { SuperHeroProvider } from 'modules/super-hero/context';
import { GenreEnum } from 'constant';

describe('SuperHeroGridItemList', () => {
  it('should render SuperHeroGridItemList', () => {
    const { container } = render(
      <SuperHeroProvider
        children={
          <table>
            <tbody>
              <SuperHeroGridItemList
                filteredRows={[{ id: '1', name: 'test', genre: GenreEnum.Male, specialty: 'test superHero' }]}
              />
            </tbody>
          </table>
        }
      />,
    );
    expect(container.querySelectorAll('td').length).toBeGreaterThan(4);
  });

  it('should render SuperHeroGridItemList without filter', () => {
    const { container } = render(
      <SuperHeroProvider
        children={
          <table>
            <tbody>
              <SuperHeroGridItemList filteredRows={undefined} />
            </tbody>
          </table>
        }
      />,
    );
    expect(container.querySelectorAll('td').length).toBe(0);
  });
});
