import { fireEvent, render, screen } from '@testing-library/react';
import { useApp } from 'hooks';
import { AppProvider } from './AppProvider';

describe('AppProvider', () => {
  const AppProviderHost = () => {
    const { setThemeLocale, locale } = useApp();
    return (
      <>
        <div>{locale === 'enUS' && <p>Is changed...</p>}</div>
        <button onClick={() => setThemeLocale('enUS')}>EN</button>
      </>
    );
  };

  it('should render AppProvider', () => {
    render(<AppProvider children={<div>test provider</div>} />);
    expect(screen.getByText('test provider')).toBeInTheDocument();
  });

  it('should execute setThemeLocale when click EN button', () => {
    render(<AppProvider children={<AppProviderHost />} />);
    const button = screen.getByText('EN');
    button && fireEvent.click(button);
    expect(screen.getByText('Is changed...')).toBeInTheDocument();
  });
});
