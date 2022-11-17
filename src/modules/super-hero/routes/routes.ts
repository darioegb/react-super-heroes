import { ID_KEY } from 'constant';
import { RouteConfig } from 'interfaces';
import { lazy } from 'react';

const path = '/superheroes';
const getDetailRoute = () =>
  lazy(
    () =>
      import(
        /* webpackChunkName: "superhero-detail-page" */ 'modules/super-hero/pages/SuperHeroDetailPage'
      ),
  );
export const routes: RouteConfig[] = [
  {
    path,
    component: lazy(
      () =>
        import(
          /* webpackChunkName: "superhero-grid-page" */ 'modules/super-hero/pages/SuperHeroGridPage'
        ),
    ),
    exact: true,
  },
  {
    path: `${path}/detail`,
    component: getDetailRoute(),
  },
  {
    path: `${path}/detail/:${ID_KEY}`,
    component: getDetailRoute(),
  },
];
