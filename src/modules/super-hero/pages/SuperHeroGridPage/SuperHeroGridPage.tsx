import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { FilterGrid } from 'components';
import { getPage } from 'utils';
import { SuperHeroGrid } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';

export const SuperHeroGridPage = () => {
  const { t: translate } = useTranslation();
  const { pageConfig, dispatch } = useSuperHero();
  
  useEffect(() => {
    const fetchData = async () => {
      const { filter } = pageConfig;
      if (filter?.length > 2 || filter?.length === 0) {
        try {            
          const req = await getPage('superHeroes', pageConfig);
          dispatch({ type: '[SuperHero] get page', payload: { superHeroes: req.data } });
        } catch (error) {
          dispatch({ type: '[SuperHero] get page', payload: { superHeroes: [] } });
        }
      } 
    };
    fetchData();
  }, [dispatch, pageConfig]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: '[SuperHero] set page config', payload: { pageConfig: { ...pageConfig, filter: value } } });
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item display="flex" alignItems="center">
        <Grid item xs={6}>{translate('superHeroes.title')}</Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <FilterGrid handleChange={handleChange} />
        </Grid>
      </Grid>
      <Grid item>
        <SuperHeroGrid />
      </Grid>
    </Grid>
  );
};
