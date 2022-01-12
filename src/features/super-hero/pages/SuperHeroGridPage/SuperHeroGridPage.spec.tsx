import { fireEvent, render, waitFor } from '@testing-library/react';

import http from 'config/httpCommon';
import { SuperHeroProvider } from 'features/super-hero/context';
import { SuperHeroGridPage } from './SuperHeroGridPage';

const mockFn = jest.fn();

jest.mock('features/super-hero/hooks/useSuperHero', () => ({
  useSuperHero: () => ({
    dispatch: mockFn,
  }),
}));

describe('SuperHeroGridPage', () => {
  it('should render SuperHeroGridPage', () => {
    const { container } = render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    expect(container).toMatchSnapshot();
  });
  it('should change filter value when the input value is changed', async () => {
    http.get = jest.fn().mockResolvedValueOnce([]);
    const { container } = render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    const input = container.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 'super' } });
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
