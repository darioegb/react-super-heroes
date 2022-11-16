import { fireEvent, render, screen } from '@testing-library/react';

import { LOCALES } from 'constant';
import { AppProvider } from 'context';
import { Navbar } from '.';

describe('Navbar', () => {
  const title = 'App title';
  const path = 'globals.locales';
  it('should render Navbar', () => {
    render(
      <AppProvider
        children={
          <Navbar title={title} locales={LOCALES} localesLabelPath={path} />
        }
      />,
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  it('should set locale when change select', () => {
    render(
      <AppProvider
        children={
          <Navbar title={title} locales={LOCALES} localesLabelPath={path} />
        }
      />,
    );
    const select = screen.getByTestId('select-locale')
      .childNodes[1] as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'esES' } });
    expect(select.value).toBe('esES');
  });
});
