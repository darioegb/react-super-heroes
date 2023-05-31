import { fireEvent, render, screen } from '@testing-library/react';

import { mockFn } from 'setupTests';
import { SuperHeroProvider } from 'modules/super-hero/context';
import { SuperHeroGridPage } from '.';
import { instances } from 'config/httpCommon';

describe('SuperHeroGridPage', () => {
  const [instance] = instances;
  it('should change filter value when the input value is changed', async () => {
    instance.request = mockFn.mockResolvedValueOnce({
      data: [
        {
          id: '1',
          name: 'BATMAN',
          genre: 1,
          specialty: 'esto es una prueba 1',
        },
        {
          id: '2',
          name: 'IRON MAN',
          genre: 1,
          specialty: 'esto es una prueba 1',
        },
      ],
      count: 10,
      isError: false,
    } as never);
    render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'man' } });
    expect(await screen.findByTestId('empty-grid-row')).not.toBeInTheDocument();
  });

  it("should'n change filter value when the input value is changed", () => {
    render(<SuperHeroProvider children={<SuperHeroGridPage />} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ma' } });
    expect(screen.getByTestId('empty-grid-row')).toBeInTheDocument();
  });
});
