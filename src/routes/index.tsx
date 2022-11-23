import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteObject } from 'interfaces';
import { SuperHeroRouter } from 'modules/super-hero/routes';

export const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/superheroes*',
      Component: SuperHeroRouter,
    },
    {
      path: '*',
      Component: lazy(
        () => import(/* webpackChunkName: "not-found" */ 'pages/NotFound'),
      ),
    },
  ];
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/superheroes" replace />} />
      {routes.map(({ Component, ...others }, i) => (
        <Route key={i} element={<Component />} {...others} />
      ))}
    </Routes>
  );
};
