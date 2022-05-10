import { PageConfig } from 'interfaces';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';

export type SuperHeroAction =
  | { type: '[SuperHero] set page config'; payload: { pageConfig: PageConfig<SuperHero> } }
  | { type: '[SuperHero] set selected'; payload: { superHero: SuperHero } }
  | { type: '[SuperHero] get page'; payload: { superHeroes: SuperHero[] } }
  | { type: '[SuperHero] create'; payload: { superHero: SuperHero } }
  | { type: '[SuperHero] update'; payload: { superHero: SuperHero } }
  | { type: '[SuperHero] delete'; payload: { id: string } };
