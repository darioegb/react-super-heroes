import { createContext } from 'react';
import {
  SuperHero,
  SuperHeroState,
} from 'modules/super-hero/interfaces/superHero';
import { Column, PageConfig } from 'interfaces';

export type SuperHeroContextProps = {
  superHeroState: SuperHeroState;
  columns: Column<SuperHero>[];
  onAddOrEditOrView: (item?: SuperHero, view?: boolean) => void;
  onDelete: (item: SuperHero) => void;
  getPage: (pageConfig: PageConfig<SuperHero>) => Promise<number>;
  setPageConfig: (pageConfig: PageConfig<SuperHero>) => void;
  saveOrUpdate: (
    opType: string,
    superHero: SuperHero,
    selectedSuperHero?: SuperHero,
  ) => Promise<void>;
};

export const SuperHeroContext = createContext<SuperHeroContextProps>(
  {} as SuperHeroContextProps,
);
