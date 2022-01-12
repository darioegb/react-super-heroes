import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { anchorOrigin, defaultPageConfig, GenreEnum } from 'constant';
import { Column } from 'interfaces';
import { SuperHero, SuperHeroState } from 'features/super-hero/interfaces/superHero';
import { superHeroReducer } from 'features/super-hero/store/superHeroReducer';
import { SuperHeroContext } from './SuperHeroContext';
import { remove } from 'utils';
import { useCustomTranslate } from 'hooks';

interface SuperHeroProviderProps {
  children: JSX.Element;
}

export const SuperHeroProvider = ({ children }: SuperHeroProviderProps) => {
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { dropdownTranslate } = useCustomTranslate();

  const initialState: SuperHeroState = {
    superHeroes: [],
    selectedSuperHero: null,
    pageConfig: defaultPageConfig,
  };
  const columns: Column<SuperHero>[] = [
    { id: 'name', label: translate('superHeroes.grid.columns.name') },
    {
      id: 'genre',
      label: translate('superHeroes.grid.columns.genre'),
      format: (value: number) => dropdownTranslate('globals.enums.genres', value, GenreEnum),
    },
    { id: 'specialty', label: translate('superHeroes.grid.columns.specialty') },
    { id: 'age', label: translate('superHeroes.grid.columns.age') },
    { id: 'height', label: translate('superHeroes.grid.columns.height') },
    { id: 'weight', label: translate('superHeroes.grid.columns.weight') },
  ];
  const [superHeroState, dispatch] = useReducer(superHeroReducer, initialState);

  const onAddOrEditOrView = (item?: SuperHero, view = false) => {
    if (item) {
      dispatch({ type: '[SuperHero] set selected', payload: { superHero: item } });
      history.push(`/superheroes/detail/${item?.id}`, { view });
      return;
    }
    history.push('/superheroes/detail');
  };

  const onDelete = async (item: SuperHero) => {
    const id = item.id as string;

    try {
      await remove('superHeroes', id);
      dispatch({ type: '[SuperHero] remove', payload: { id } });
      enqueueSnackbar(translate('superHeroes.toasts.remove.success'), {
        variant: 'success',
        anchorOrigin,
      });
    } catch (error) {
      enqueueSnackbar(translate('superHeroes.toasts.remove.error'), {
        variant: 'error',
        anchorOrigin,
      });
    }
  };

  return (
    <SuperHeroContext.Provider
      value={{
        superHeroState,
        columns,
        onAddOrEditOrView,
        onDelete,
        dispatch,
      }}
    >
      {children}
    </SuperHeroContext.Provider>
  );
};
