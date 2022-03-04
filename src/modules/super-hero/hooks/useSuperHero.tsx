import { useContext } from 'react';
import { SuperHeroContext } from '../context/SuperHeroContext';

export const useSuperHero = () => {
  const { columns, superHeroState, dispatch, onDelete, onAddOrEditOrView } = useContext(SuperHeroContext);
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
    dispatch,
    onDelete,
    onAddOrEditOrView,
  };
};
