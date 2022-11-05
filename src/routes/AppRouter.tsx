import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { NotFound } from 'pages/NotFound';
import { SuperHeroRouter } from 'modules/super-hero';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/superheroes" />
        </Route>
        <Route path="/superheroes*" component={SuperHeroRouter} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
