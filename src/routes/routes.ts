import { lazy } from 'react';

import { RouteConfig } from 'interfaces';
import { SuperHeroRouter } from 'modules/super-hero/routes';

export const routes: RouteConfig[] = [
  {
    path: '/superheroes*',
    component: SuperHeroRouter,
  },
  {
    path: '*',
    component: lazy(
      () => import(/* webpackChunkName: "not-found" */ 'pages/NotFound'),
    ),
  },
];
