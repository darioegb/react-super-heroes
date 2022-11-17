import { LazyExoticComponent } from 'react';

import { JSXComponent } from 'types';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<JSXComponent> | JSXComponent;
  exact?: boolean;
  children?: RouteConfig[];
}
