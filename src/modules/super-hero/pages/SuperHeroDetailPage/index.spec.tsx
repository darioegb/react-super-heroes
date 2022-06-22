import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SuperHeroProvider } from 'modules/super-hero/context';
import { SuperHeroDetailPage } from '.';

jest.mock('modules/super-hero/hooks/useSuperHero', () => ({
  useSuperHero: () => ({
    saveOrUpdate: jest.fn(),
    selectedSuperHero: undefined,
  }),
}));

describe('SuperHeroDetailPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const initRender = () =>
    render(<SuperHeroProvider children={<SuperHeroDetailPage />} />, {
      wrapper: MemoryRouter,
    });

  it('should render SuperHeroDetailPage', () => {
    const { container } = initRender();
    expect(container).toMatchSnapshot();
  });

  it('should display required error when submit button is trigger without complete form', async () => {
    initRender();
    fireEvent.submit(screen.getByText('globals.buttons.save'));
    const select = await screen.findByTestId('select-control');
    expect(
      await screen.findByLabelText('superHeroes.grid.columns.name'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      await screen.findByLabelText('superHeroes.grid.columns.specialty'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(select.childNodes[0]).toHaveClass('Mui-error');
  });

  it('should reset form when click on reset button', async () => {
    initRender();
    const input = screen.getByRole('textbox', {
      name: /name/i,
    }) as HTMLInputElement;
    fireEvent.input(input, {
      target: {
        value: 'test',
      },
    });
    await waitFor(() => {
      expect(input.value).toBe('TEST');
    });
    fireEvent.reset(screen.getByText('globals.buttons.reset'));
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should submit form when click on submit button', async () => {
    initRender();
    const input = screen.getByLabelText(
      'superHeroes.grid.columns.name',
    ) as HTMLInputElement;
    const textarea = screen.getByLabelText(
      'superHeroes.grid.columns.specialty',
    ) as HTMLTextAreaElement;
    const inputAge = screen.getByLabelText(
      'superHeroes.grid.columns.age',
    ) as HTMLInputElement;
    const inputHeight = screen.getByLabelText(
      'superHeroes.grid.columns.height',
    ) as HTMLInputElement;
    const inputWeight = screen.getByLabelText(
      'superHeroes.grid.columns.weight',
    ) as HTMLInputElement;
    const element = screen.getByTestId('select-control');
    const { getByRole } = within(element);
    const select = getByRole('button');
    fireEvent.mouseDown(select);
    const list = within(screen.getByRole('listbox')); // get list opened by trigger fireEvent
    fireEvent.click(list.getByText(/globals.enums.genres.male/i)); //select by text
    fireEvent.input(input, { target: { value: 'test' } });
    fireEvent.input(textarea, { target: { value: 'This is a test' } });
    fireEvent.input(inputAge, { target: { value: 30 } });
    fireEvent.input(inputHeight, { target: { value: 1.7 } });
    fireEvent.input(inputWeight, { target: { value: 80 } });
    fireEvent.submit(screen.getByText('globals.buttons.save'));
    await waitFor(() =>
      expect(textarea).toHaveAttribute('aria-invalid', 'false'),
    );
    await waitFor(() =>
      expect(select.innerHTML).toBe('globals.enums.genres.male'),
    );
  });
});
