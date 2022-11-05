import { fireEvent, render, screen } from '@testing-library/react';
import { AppProvider } from 'context';

import { Navbar } from '.';

describe('Navbar', () => {
  it('should render Navbar', () => {
    render(<AppProvider children={<Navbar />} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  it('should set locale when change select', () => {
    render(<AppProvider children={<Navbar />} />);
    const select = screen.getByTestId('select-locale')
      .childNodes[1] as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'esES' } });
    expect(select.value).toBe('esES');
  });
});
