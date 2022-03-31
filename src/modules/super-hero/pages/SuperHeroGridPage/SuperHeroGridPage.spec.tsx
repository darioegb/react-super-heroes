import { fireEvent, render, waitFor } from '@testing-library/react';

import { instances } from 'config/httpCommon';
import { SuperHeroProvider } from 'modules/super-hero/context';
import { SuperHeroGridPage } from './SuperHeroGridPage';

const mockFn = jest.fn();

jest.mock('features/super-hero/hooks/useSuperHero', () => ({
  useSuperHero: () => ({
    dispatch: mockFn,
  }),
}));

describe('SuperHeroGridPage', () => {
  const [instance] = instances;
  it('should render SuperHeroGridPage', () => {
    const { container } = render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    expect(container).toMatchSnapshot();
  });
  it('should change filter value when the input value is changed', async () => {
    instance.get = jest.fn().mockResolvedValueOnce([]);
    const { container } = render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    const input = container.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 'super' } });
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
