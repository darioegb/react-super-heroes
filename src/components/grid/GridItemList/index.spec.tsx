import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { GridItem, GridItemList } from 'components';

import { SuperHeroProvider } from 'modules/super-hero/context';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';

const mockFn = jest.fn();
jest.mock('modules/super-hero/hooks/useSuperHero', () => ({
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
    const {
      result: {
        current: { superHeroes, columns, onAddOrEditOrView, onDelete },
      },
    } = renderHook(() => useSuperHero());
    render(
      <SuperHeroProvider
        children={
          <table>
            <tbody>
              <GridItemList
                rows={superHeroes}
                order={'asc'}
                orderBy={'name'}
                renderItem={(item) => (
                  <GridItem
                    key={item.name}
                    row={item}
                    columns={columns}
                    onAddOrEditOrView={onAddOrEditOrView}
                    onDelete={onDelete}
                  />
                )}
              />
            </tbody>
          </table>
        }
      />,
    );
    expect(screen.getAllByRole('cell').length).toBe(4);
  });
});
