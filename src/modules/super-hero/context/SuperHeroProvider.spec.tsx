import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { instances } from 'config/httpCommon';
import { useSuperHero } from '../hooks/useSuperHero';
import { SuperHeroProvider } from './SuperHeroProvider';
import { GenreEnum } from 'constant';

const mockFn = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockFn,
  }),
}));

describe('SuperHeroProvider', () => {
  const [instance] = instances;
  const mockSuperHero = { id: '1', name: 'test', genre: GenreEnum.Male, specialty: 'test superHero' };

  const SuperHeroProviderHost = () => {
    const { onAddOrEditOrView, onDelete } = useSuperHero();
    return (
      <>
        <button onClick={() => onAddOrEditOrView()}>ADD</button>
        <button onClick={() => onAddOrEditOrView(mockSuperHero)}>EDIT</button>
        <button onClick={() => onDelete(mockSuperHero)}>DELETE</button>
      </>
    );
  };

  it('should render SuperHeroProvider', () => {
    render(<SuperHeroProvider children={<div>test provider</div>} />);
    expect(screen.getByText('test provider')).toBeInTheDocument();
  });

  it('should execute onAddOrEditOrView when click add button', () => {
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, { wrapper: MemoryRouter });
    const button = screen.getByText('ADD');
    button && fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should execute onAddOrEditOrView when click edit button', () => {
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, { wrapper: MemoryRouter });
    const button = screen.getByText('EDIT');
    button && fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledWith('/superheroes/detail/1', { view: false });
  });

  it('should execute onDelete when click delete button', async () => {
    instance.delete = jest.fn().mockResolvedValueOnce('default');
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, { wrapper: MemoryRouter });
    const button = screen.getByText('DELETE');
    button && fireEvent.click(button);
    await waitFor(() => {
      expect(instance.delete).toHaveBeenCalled();
    });
  });
});
