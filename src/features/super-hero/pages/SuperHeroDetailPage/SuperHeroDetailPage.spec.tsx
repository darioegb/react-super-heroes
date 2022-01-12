import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SuperHeroProvider } from 'features/super-hero/context';
import { SuperHeroDetailPage } from './SuperHeroDetailPage';

describe('SuperHeroDetailPage', () => {
  it('should render SuperHeroDetailPage', () => {
    const { container } = render(<SuperHeroProvider children={<SuperHeroDetailPage />} />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
