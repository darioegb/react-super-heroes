import { fireEvent, render, waitFor } from '@testing-library/react';

import { instances } from 'config/httpCommon';
import { SuperHeroProvider } from 'modules/super-hero/context';
import { SuperHeroGridPage } from './SuperHeroGridPage';

const mockFn = jest.fn();
const initialPageConfig = {
  page: 0,
  rowsPerPage: 5,
  orderBy: 'id',
  order: 'asc',
  filter: '',
};

jest.mock('../../hooks/useSuperHero', () => ({
  useSuperHero: () => ({
    dispatch: mockFn,
    page: initialPageConfig.page,
    rowsPerPage: initialPageConfig.rowsPerPage,
    orderBy: initialPageConfig.orderBy,
    order: initialPageConfig.order,
    filter: initialPageConfig.filter,
    pageConfig: initialPageConfig,
  }),
}));

describe('SuperHeroGridPage', () => {
  const [instance] = instances;
  it('should render SuperHeroGridPage', () => {
    const { container } = render(
      <SuperHeroProvider children={<SuperHeroGridPage />} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should change filter value when the input value is changed', async () => {
    instance.get = jest.fn().mockResolvedValueOnce([]);
    const { container } = render(
      <SuperHeroProvider children={<SuperHeroGridPage />} />,
    );
    const input = container.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 'super' } });
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
