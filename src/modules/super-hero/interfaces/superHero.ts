import { GenreEnum } from 'constant';
import { PageConfig } from 'interfaces';
import { GenericOrNull } from 'types';

export interface SuperHero {
  id?: string;
  name: string;
  genre: GenreEnum;
  specialty: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface SuperHeroState {
  superHeroes: SuperHero[];
  selectedSuperHero: GenericOrNull<SuperHero>;
  pageConfig: PageConfig<SuperHero>;
}
