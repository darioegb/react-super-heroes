import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SuperHeroProvider } from 'modules/super-hero/context';
import { BaseLayout } from 'layouts';
import { RouteObject } from 'interfaces';
import { ID_KEY } from 'constant';

export const SuperHeroRouter = () => {
  const getDetailRoute = () =>
    lazy(
      () =>
        import(
          /* webpackChunkName: "superhero-detail-page" */ 'modules/super-hero/pages/SuperHeroDetailPage'
        ),
    );
  const routes: RouteObject[] = [
    {
      path: '',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "superhero-grid-page" */ 'modules/super-hero/pages/SuperHeroGridPage'
          ),
      ),
    },
    {
      path: 'detail',
      Component: getDetailRoute(),
    },
    {
      path: `detail/:${ID_KEY}`,
      Component: getDetailRoute(),
    },
  ];
  return (
    <SuperHeroProvider>
      <BaseLayout>
        <Routes>
          {routes.map(({ Component, ...others }, i) => (
            <Route key={i} element={<Component />} {...others} />
          ))}
        </Routes>
      </BaseLayout>
    </SuperHeroProvider>
  );
};
