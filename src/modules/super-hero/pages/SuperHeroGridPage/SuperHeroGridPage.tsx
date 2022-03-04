import { ChangeEvent, useEffect } from 'react';

import { FilterGrid } from 'components';
import { SuperHeroGrid } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { getAll } from 'utils';

export const SuperHeroGridPage = () => {
  const { pageConfig, dispatch } = useSuperHero();

  useEffect(() => {
    let componentMounted = true;
    const initFetch = async () => {
      try {
        const req = await getAll('superHeroes');
        componentMounted && dispatch({ type: '[SuperHero] get page', payload: { superHeroes: req.data } });
      } catch (error) {
        componentMounted && dispatch({ type: '[SuperHero] get page', payload: { superHeroes: [] } });
      }
    };
    initFetch();
    return () => {
      componentMounted = false;
    };
  }, [dispatch]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: '[SuperHero] set page config', payload: { pageConfig: { ...pageConfig, filter: value } } });
  };

  return (
    <>
      <FilterGrid handleChange={handleChange} />
      <SuperHeroGrid />
    </>
  );
};
