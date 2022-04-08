import { fireEvent, render, waitFor } from '@testing-library/react';

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
    setPageConfig: jest.fn(),
    getPage: mockFn,
    page: initialPageConfig.page,
    rowsPerPage: initialPageConfig.rowsPerPage,
    orderBy: initialPageConfig.orderBy,
    order: initialPageConfig.order,
    filter: initialPageConfig.filter,
    pageConfig: initialPageConfig,
  }),
}));

describe('SuperHeroGridPage', () => {
  it('should change filter value when the input value is changed', async () => {
    mockFn.mockResolvedValueOnce(10);
    const { container } = render(
      <SuperHeroProvider children={<SuperHeroGridPage />} />,
    );
    const input = container.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 'super' } });
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
