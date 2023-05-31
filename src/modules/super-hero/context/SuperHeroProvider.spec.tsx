import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { instances } from 'config/httpCommon';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHeroProvider } from './SuperHeroProvider';
import { mockSnackBar, mockUseNavigate } from 'setupTests';
import { GenreEnum } from 'enums';

describe('SuperHeroProvider', () => {
  const [instance] = instances;
  const mockSuperHero = {
    id: '1',
    name: 'test',
    genre: GenreEnum.Male,
    specialty: 'test superHero',
  };

  const SuperHeroProviderHost = () => {
    const { onAddOrEditOrView, onDelete, saveOrUpdate } = useSuperHero();
    return (
      <>
        <button onClick={() => onAddOrEditOrView()}>ADD</button>
        <button onClick={() => onAddOrEditOrView(mockSuperHero)}>EDIT</button>
        <button onClick={() => onDelete(mockSuperHero)}>DELETE</button>
        <button onClick={() => saveOrUpdate('create', mockSuperHero)}>
          SAVE
        </button>
        <button
          onClick={() =>
            saveOrUpdate('update', mockSuperHero, {
              ...mockSuperHero,
              name: 'test old',
            })
          }
        >
          UPDATE
        </button>
      </>
    );
  };

  it('should render SuperHeroProvider', () => {
    render(<SuperHeroProvider children={<div>test provider</div>} />);
    expect(screen.getByText('test provider')).toBeInTheDocument();
  });

  it('should execute onAddOrEditOrView when click add button', () => {
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('ADD');
    button && fireEvent.click(button);
    expect(mockUseNavigate).toHaveBeenCalled();
  });

  it('should execute onAddOrEditOrView when click edit button', () => {
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('EDIT');
    button && fireEvent.click(button);
    expect(mockUseNavigate).toHaveBeenCalledWith('/superheroes/detail/1', {
      state: {
        view: false,
      },
    });
  });

  it('should execute onDelete when click delete button', async () => {
    instance.request = jest.fn().mockResolvedValueOnce('default');
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('DELETE');
    button && fireEvent.click(button);
    await waitFor(() => {
      expect(instance.request).toHaveBeenCalled();
    });
  });

  it("should'n execute onDelete when click delete button when failed", async () => {
    instance.request = jest.fn().mockRejectedValueOnce(new Error('Async error'));
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('DELETE');
    button && fireEvent.click(button);
    await waitFor(() => {
      expect(mockSnackBar).toHaveBeenCalledWith('globals.toasts.delete.error', {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        variant: 'error',
      });
    });
  });

  it('should execute saveOrUpdate when click on save button', async () => {
    instance.request = jest.fn().mockResolvedValueOnce({ data: mockSuperHero });
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('SAVE');
    button && fireEvent.click(button);
    await waitFor(() => {
      expect(instance.request).toHaveBeenCalled();
    });
  });

  it('should execute saveOrUpdate when click on update button', async () => {
    instance.request = jest.fn().mockResolvedValueOnce({ data: mockSuperHero });
    render(<SuperHeroProvider children={<SuperHeroProviderHost />} />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText('UPDATE');
    button && fireEvent.click(button);
    await waitFor(() => {
      expect(instance.request).toHaveBeenCalled();
    });
  });
});
