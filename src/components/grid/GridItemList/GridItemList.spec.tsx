import { render } from '@testing-library/react';
import { GridItemList } from 'components';

import { SuperHeroProvider } from 'modules/super-hero/context';

const mockFn = jest.fn();
jest.mock('../../hooks/useSuperHero', () => ({
  useSuperHero: () => ({
    rowsPerPage: 5,
    orderBy: 'id',
    order: 'asc',
    superHeroes: [
      {
        id: '1',
        name: 'test',
        genre: 1,
        specialty: 'test superHero',
      },
    ],
    columns: [
      { id: 'name', label: 'Name' },
      { id: 'genre', label: 'Genre' },
      { id: 'specialty', label: 'Specialty' },
    ],
    onAddOrEditOrView: mockFn,
    onDelete: mockFn,
  }),
}));

describe('SuperHeroGridItemList', () => {
  it('should render SuperHeroGridItemList', () => {
    const { container } = render(
      <SuperHeroProvider
        children={
          <table>
            <tbody>
              <GridItemList />
            </tbody>
          </table>
        }
      />,
    );
    expect(container.querySelectorAll('td').length).toBe(4);
  });
});
