import { GenreEnum } from 'constant';
import { PageConfig } from 'interfaces';

interface SuperHeroCommons {
  name: string;
  genre: GenreEnum;
  specialty: string;
  age?: number;
  height?: number;
  weight?: number;
}
export interface SuperHero extends SuperHeroCommons {
  id?: string;
  picture?: string;
}

export interface SuperHeroForm extends SuperHeroCommons {
  picture?: File[];
}
export interface SuperHeroState {
  superHeroes: SuperHero[];
  pageConfig: PageConfig<SuperHero>;
  selectedSuperHero?: SuperHero;
}
