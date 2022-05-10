import { render, screen } from '@testing-library/react';

import { GlobalLoader } from '.';

jest.mock('hooks', () => ({
  useAxiosLoader: () => [true],
}));

describe('GlobalLoader', () => {
  it('should render GlobalLoader spinner when exist request', () => {
    render(<GlobalLoader />);
    const circularProgress = screen.getByTestId('global-loader');
    expect(circularProgress).toBeInTheDocument();
  });
});
