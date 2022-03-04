import { createContext, Dispatch } from 'react';
import { SuperHero, SuperHeroState } from 'modules/super-hero/interfaces/superHero';
import { Column } from 'interfaces';
import { SuperHeroAction } from 'modules/super-hero/store/superHeroAction';

export type SuperHeroContextProps = {
  superHeroState: SuperHeroState;
  columns: Column<SuperHero>[];
  onAddOrEditOrView: (item?: SuperHero, view?: boolean) => void;
  onDelete: (item: SuperHero) => void;
  dispatch: Dispatch<SuperHeroAction>;
};

export const SuperHeroContext = createContext<SuperHeroContextProps>({} as SuperHeroContextProps);
