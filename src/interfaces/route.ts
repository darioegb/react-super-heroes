import { LazyExoticComponent } from 'react';

import { JSXComponent } from 'types';

export interface RouteObject {
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
}
