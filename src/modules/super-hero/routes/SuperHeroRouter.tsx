import { Route, Switch } from 'react-router-dom';
import { SuperHeroProvider } from 'modules/super-hero/context';
import { BaseLayout } from 'layouts';
import {
  SuperHeroDetailPage,
  SuperHeroGridPage,
} from 'modules/super-hero/pages';
import { ID_KEY } from 'constant';

export const SuperHeroRouter = () => {
  const path = '/superheroes';
  return (
    <SuperHeroProvider>
      <BaseLayout>
        <Switch>
          <Route exact path={path} component={SuperHeroGridPage} />
          <Route path={`${path}/detail`} component={SuperHeroDetailPage} />
          <Route
            path={`${path}/detail/:${ID_KEY}`}
            component={SuperHeroDetailPage}
          />
        </Switch>
      </BaseLayout>
    </SuperHeroProvider>
  );
};
