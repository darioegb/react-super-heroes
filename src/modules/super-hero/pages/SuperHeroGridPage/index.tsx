import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Toolbar, Typography } from '@mui/material';

import { FilterGrid } from 'components';
import { SuperHeroGrid } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';

export const SuperHeroGridPage = () => {
  const [count, setCount] = useState<number>(0);
  const { t: translate } = useTranslation();
  const { pageConfig, filter, getPage, setPageConfig } = useSuperHero();

  useEffect(() => {
    const fetchData = async () => {
      const count = await getPage(pageConfig);
      setCount(count);
    };
    if (filter?.length > 2 || filter?.length === 0) fetchData();
  }, [filter, getPage, pageConfig]);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPageConfig({ ...pageConfig, filter: value });
  };

  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {translate('superHeroes.title')}
        </Typography>
        <FilterGrid
          label={translate('globals.grid.filterInput.label')}
          placeholder={translate('globals.grid.filterInput.placeholder')}
          onChange={handleChange}
        />
      </Toolbar>
      <SuperHeroGrid count={count} />
    </Paper>
  );
};

export default SuperHeroGridPage;
