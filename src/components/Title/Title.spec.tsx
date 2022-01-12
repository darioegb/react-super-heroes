import { render, screen } from '@testing-library/react';

import { Title } from './Title';

describe('Title', () => {
  it('should render Title', () => {
    render(<Title />);
    const h1Element = screen.getByText('globals.title');
    expect(h1Element).toBeInTheDocument();
  });
});
