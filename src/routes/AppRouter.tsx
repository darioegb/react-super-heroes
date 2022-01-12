import { BrowserRouter } from 'react-router-dom';

import { SuperHeroRouter } from 'features/super-hero';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <SuperHeroRouter />
    </BrowserRouter>
  );
};
