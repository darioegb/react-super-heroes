import { Route, Switch } from 'react-router-dom';

import { SuperHeroProvider } from 'modules/super-hero/context';
import { BaseLayout } from 'layouts';
import { routes } from './routes';

export const SuperHeroRouter = () => {
  return (
    <SuperHeroProvider>
      <BaseLayout>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </BaseLayout>
    </SuperHeroProvider>
  );
};
