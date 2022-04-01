import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { FilterGrid } from 'components';
import { createHttpParams, fetch } from 'utils';
import { SuperHeroGrid } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';
import { instances } from 'config/httpCommon';

export const SuperHeroGridPage = () => {
  const [count, setCount] = useState(0);
  const { t: translate } = useTranslation();
  const { pageConfig, dispatch } = useSuperHero();
  const [instance] = instances;

  useEffect(() => {
    const fetchData = async () => {
      const { filter } = pageConfig;
      if (filter?.length > 2 || filter?.length === 0) {
        const { isError, data, count } =  await fetch<SuperHero[]>({
          instance, 
          url: 'superHeroes',
          method: 'get',
          config: {
            params: createHttpParams<SuperHero>(pageConfig),
          },
        });
        const dataLength = data?.length || 100;
        setCount(count || dataLength);
        dispatch({ type: '[SuperHero] get page', payload: { superHeroes: isError || !data ? [] : data } });
      } 
    };
    fetchData();
  }, [dispatch, instance, pageConfig]);

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
        <SuperHeroGrid count={count} />
      </Grid>
    </Grid>
  );
};
