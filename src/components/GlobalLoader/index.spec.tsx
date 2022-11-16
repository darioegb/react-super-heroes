import { render, screen } from '@testing-library/react';

import { GlobalLoader } from '.';

describe('GlobalLoader', () => {
  it('should render GlobalLoader spinner when exist request', () => {
    render(<GlobalLoader loading={true} />);
    const circularProgress = screen.getByTestId('global-loader');
    expect(circularProgress).toBeInTheDocument();
  });
});
