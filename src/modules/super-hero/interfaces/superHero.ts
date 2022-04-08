import { GenreEnum } from 'constant';
import { PageConfig } from 'interfaces';

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
  pageConfig: PageConfig<SuperHero>;
  selectedSuperHero?: SuperHero;
}
