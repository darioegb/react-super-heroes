import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFound } from '.';

describe('NotFound', () => {
  it('should render', () => {
    const { container } = render(<NotFound />, { wrapper: MemoryRouter });
    expect(container).toBeInTheDocument();
    expect(screen.getByText('pageNotFound.title')).toBeTruthy();
    expect(screen.getByText('pageNotFound.subtitle')).toBeTruthy();
  });
});
