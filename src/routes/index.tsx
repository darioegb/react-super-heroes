import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { routes } from './routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/superheroes" />
        </Route>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};
