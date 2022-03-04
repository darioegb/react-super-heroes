import { Switch, Route, Redirect } from 'react-router-dom';
import { idKey } from 'constant';
import { SuperHeroGridPage, SuperHeroDetailPage } from 'modules/super-hero/pages';
import { SuperHeroProvider } from 'modules/super-hero/context';

export const SuperHeroRouter = () => {
  const path = '/superheroes';
  return (
    <SuperHeroProvider>
      <Switch>
        <Route exact path={path} component={SuperHeroGridPage} />
        <Route exact path={`${path}/detail`} component={SuperHeroDetailPage} />
        <Route exact path={`${path}/detail/:${idKey}`} component={SuperHeroDetailPage} />

        <Redirect to={path} />
      </Switch>
    </SuperHeroProvider>
  );
};
