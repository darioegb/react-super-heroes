import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { FilterGrid } from 'components';
import { SuperHeroGrid } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';

export const SuperHeroGridPage = () => {
  const [count, setCount] = useState<number>(0);
  const { t: translate } = useTranslation();
  const { pageConfig, getPage, setPageConfig } = useSuperHero();

  useEffect(() => {
    const fetchData = async () => {
      const { filter } = pageConfig;
      if (filter?.length > 2 || filter?.length === 0) {
        const count = await getPage(pageConfig);
        setCount(count);
      }
    };
    fetchData();
  }, [getPage, pageConfig]);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPageConfig({ ...pageConfig, filter: value });
  };

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item display='flex' alignItems='center'>
        <Grid item xs={6}>
          {translate('superHeroes.title')}
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='flex-end'>
          <FilterGrid handleChange={handleChange} />
        </Grid>
      </Grid>
      <Grid item>
        <SuperHeroGrid count={count} />
      </Grid>
    </Grid>
  );
};
