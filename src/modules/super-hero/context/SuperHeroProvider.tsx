import { useCallback, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
  anchorOrigin,
  defaultPageConfig,
  GenreEnum,
  httpMethodKeys,
} from 'constant';
import { Column, PageConfig } from 'interfaces';
import {
  SuperHero,
  SuperHeroState,
} from 'modules/super-hero/interfaces/superHero';
import { superHeroReducer } from 'modules/super-hero/store/superHeroReducer';
import { SuperHeroContext } from './SuperHeroContext';
import { createHttpParams, fetch } from 'utils';
import { useCustomTranslate } from 'hooks';
import { instances } from 'config/httpCommon';

interface SuperHeroProviderProps {
  children: JSX.Element;
}

export const SuperHeroProvider = ({ children }: SuperHeroProviderProps) => {
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { dropdownTranslate } = useCustomTranslate();
  const [instance] = instances;
  const resourceUrl = 'superHeroes';
  const toastParam = translate('superHeroes.detail.title');
  const initialState: SuperHeroState = {
    superHeroes: [],
    selectedSuperHero: undefined,
    pageConfig: defaultPageConfig,
  };
  const columns: Column<SuperHero>[] = [
    { id: 'name', label: translate('superHeroes.grid.columns.name') },
    {
      id: 'genre',
      label: translate('superHeroes.grid.columns.genre'),
      format: (value: number) =>
        dropdownTranslate('globals.enums.genres', value, GenreEnum),
    },
    {
      id: 'specialty',
      label: translate('superHeroes.grid.columns.specialty'),
    },
    { id: 'age', label: translate('superHeroes.grid.columns.age') },
    { id: 'height', label: translate('superHeroes.grid.columns.height') },
    { id: 'weight', label: translate('superHeroes.grid.columns.weight') },
    {
      id: 'picture',
      label: translate('superHeroes.grid.columns.picture'),
      isImg: true,
    },
  ];
  const [superHeroState, dispatch] = useReducer(superHeroReducer, initialState);

  const onAddOrEditOrView = (item?: SuperHero, view = false) => {
    if (item) {
      dispatch({
        type: '[SuperHero] set selected',
        payload: { superHero: item },
      });
      history.push(`/superheroes/detail/${item?.id}`, { view });
      return;
    }
    history.push('/superheroes/detail');
  };

  const onDelete = async (item: SuperHero) => {
    const id = item.id as string;

    const { isError } = await fetch({
      instance,
      url: `${resourceUrl}/${id}`,
      method: 'delete',
      data: id,
    });

    if (isError) {
      enqueueSnackbar(
        translate('globals.toasts.delete.error', {
          value: toastParam.toLowerCase(),
        }),
        {
          variant: 'error',
          anchorOrigin,
        },
      );
      return;
    }
    dispatch({ type: '[SuperHero] delete', payload: { id } });
    enqueueSnackbar(
      translate('globals.toasts.delete.success', { value: toastParam }),
      {
        variant: 'success',
        anchorOrigin,
      },
    );
  };

  const getPage = useCallback(
    async (pageConfig: PageConfig<SuperHero>) => {
      const result = await fetch<SuperHero[]>({
        instance,
        url: resourceUrl,
        method: 'get',
        config: {
          params: createHttpParams<SuperHero>(pageConfig),
        },
      });
      if (!result) return 0;
      const { isError, data, count } = result;
      const dataLength = data?.length || 100;
      dispatch({
        type: '[SuperHero] get page',
        payload: { superHeroes: isError || !data ? [] : data },
      });
      return count || dataLength;
    },
    [instance],
  );

  const setPageConfig = (pageConfig: PageConfig<SuperHero>) => {
    dispatch({
      type: '[SuperHero] set page config',
      payload: { pageConfig },
    });
  };

  const saveOrUpdate = async (
    opType: string,
    superHero: SuperHero,
    selectedSuperHero?: SuperHero,
  ) => {
    const { isError, data } =
      opType === httpMethodKeys.put
        ? await fetch<SuperHero>({
            instance,
            url: `${resourceUrl}/${selectedSuperHero?.id}`,
            method: 'put',
            data: { ...selectedSuperHero, ...superHero },
          })
        : await fetch<SuperHero>({
            instance,
            url: resourceUrl,
            method: 'post',
            data: superHero,
          });

    if (isError || !data) {
      enqueueSnackbar(
        translate(`globals.toasts.${opType}.error`, {
          value: toastParam.toLowerCase(),
        }),
        {
          variant: 'error',
          anchorOrigin,
        },
      );
      return;
    }

    dispatch({
      type:
        opType === httpMethodKeys.put
          ? '[SuperHero] update'
          : '[SuperHero] create',
      payload: { superHero: data },
    });
    enqueueSnackbar(
      translate(`globals.toasts.${opType}.success`, { value: toastParam }),
      {
        variant: 'success',
        anchorOrigin,
      },
    );
  };

  return (
    <SuperHeroContext.Provider
      value={{
        superHeroState,
        columns,
        onAddOrEditOrView,
        onDelete,
        getPage,
        setPageConfig,
        saveOrUpdate,
      }}
    >
      {children}
    </SuperHeroContext.Provider>
  );
};
