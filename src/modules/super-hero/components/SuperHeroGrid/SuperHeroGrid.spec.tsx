import { fireEvent, render, screen } from '@testing-library/react';

import { SuperHeroGrid } from './SuperHeroGrid';
import {
  SuperHeroContext,
  SuperHeroProvider,
} from 'modules/super-hero/context';
import { defaultPageConfig, GenreEnum } from 'constant';
import {
  SuperHero,
  SuperHeroState,
} from 'modules/super-hero/interfaces/superHero';
import { superHeroReducer } from 'modules/super-hero/store/superHeroReducer';
import { Column } from 'interfaces';
import { useReducer } from 'react';

describe('SuperHeroGrid', () => {
  const mockDispatch = jest.fn();

  const SuperHeroProviderHost = ({ children }: any) => {
    const initialState: SuperHeroState = {
      superHeroes: [
        {
          id: '1',
          name: 'test',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
        {
          id: '2',
          name: 'test2',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
        {
          id: '3',
          name: 'test3',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
        {
          id: '4',
          name: 'test4',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
        {
          id: '5',
          name: 'test5',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
        {
          id: '6',
          name: 'test6',
          genre: GenreEnum.Male,
          specialty: 'test superHero',
        },
      ],
      selectedSuperHero: undefined,
      pageConfig: defaultPageConfig,
    };
    const columns: Column<SuperHero>[] = [
      { id: 'name', label: 'Name' },
      {
        id: 'genre',
        label: 'Genre',
      },
      { id: 'specialty', label: 'Specialty' },
    ];
    const [superHeroState] = useReducer(superHeroReducer, initialState);
    return (
      <SuperHeroContext.Provider
        value={{
          superHeroState,
          columns,
          onAddOrEditOrView: mockDispatch,
          onDelete: mockDispatch,
          setPageConfig: mockDispatch,
          getPage: mockDispatch,
          saveOrUpdate: mockDispatch,
        }}
      >
        {children}
      </SuperHeroContext.Provider>
    );
  };

  it('should render SuperHeroGrid', () => {
    const { container } = render(
      <SuperHeroProviderHost children={<SuperHeroGrid count={6} />} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render SuperHeroGrid without data when not exist data', () => {
    const { container } = render(
      <SuperHeroProvider children={<SuperHeroGrid count={6} />} />,
    );
    expect(container.querySelectorAll('tr').length).toBe(2);
  });

  it('should cahnge sort when click on any colunm', () => {
    render(<SuperHeroProviderHost children={<SuperHeroGrid count={6} />} />);
    const sort = screen.getByText('Name');
    fireEvent.click(sort);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should change page when click o next page button', () => {
    const { container } = render(
      <SuperHeroProviderHost children={<SuperHeroGrid count={6} />} />,
    );
    const button = container.querySelector(
      'button[aria-label="Go to next page"]',
    );
    button && fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
