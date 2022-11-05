import { render } from '@testing-library/react';

import { BaseLayout } from '.';
import { AppProvider } from 'context';

describe('BaseLayout', () => {
  it('should render', () => {
    const { container } = render(<AppProvider children={<BaseLayout />} />);
    expect(container).toBeInTheDocument();
  });
});
