import { BrowserRouter } from 'react-router-dom';

import { SuperHeroRouter } from 'modules/super-hero';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <SuperHeroRouter />
    </BrowserRouter>
  );
};
