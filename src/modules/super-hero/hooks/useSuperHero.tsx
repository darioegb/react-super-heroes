import { useContext } from 'react';

import { SuperHeroContext } from 'modules/super-hero/context';

export const useSuperHero = () => {
  const {
    columns,
    superHeroState,
    onDelete,
    onAddOrEditOrView,
    getPage,
    setPageConfig,
    saveOrUpdate,
  } = useContext(SuperHeroContext);
  const {
    pageConfig: { page, rowsPerPage, order, orderBy, filter },
    pageConfig,
    selectedSuperHero,
    superHeroes,
  } = superHeroState;

  return {
    columns,
    page,
    rowsPerPage,
    order,
    orderBy,
    filter,
    selectedSuperHero,
    superHeroes,
    pageConfig,
    onDelete,
    onAddOrEditOrView,
    getPage,
    setPageConfig,
    saveOrUpdate,
  };
};
