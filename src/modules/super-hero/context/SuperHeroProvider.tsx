import { useCallback, useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
  ANCHOR_ORIGIN,
  DEFAULT_PAGE_CONFIG,
  HTTP_METHOD_KEYS,
} from 'utils/globals';
import { Column, PageConfig } from 'interfaces';
import {
  SuperHero,
  SuperHeroState,
} from 'modules/super-hero/interfaces/superHero';
import { superHeroReducer } from 'modules/super-hero/store/superHeroReducer';
import { SuperHeroContext } from './SuperHeroContext';
import { createHttpParams } from 'utils';
import { useAxios, useCustomTranslate } from 'hooks';
import { instances } from 'config/httpCommon';
import { GenreEnum } from 'enums';

interface SuperHeroProviderProps {
  children: JSX.Element;
}

export const SuperHeroProvider = ({ children }: SuperHeroProviderProps) => {
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [instance] = instances;
  const { dropdownTranslate } = useCustomTranslate();
  const { exec } = useAxios<SuperHero>(instance);
  const resourceUrl = 'superHeroes';
  const toastParam = translate('superHeroes.detail.title');
  const initialState: SuperHeroState = {
    superHeroes: [],
    selectedSuperHero: undefined,
    pageConfig: DEFAULT_PAGE_CONFIG,
  };
  const columns: Column<SuperHero>[] = useMemo(
    () => [
      { id: 'name', label: translate('superHeroes.grid.columns.name') },
      {
        id: 'genre',
        label: translate('superHeroes.grid.columns.genre'),
        format: (value: number) =>
          dropdownTranslate('globals.enums.genres', GenreEnum[value]),
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
    ],
    [dropdownTranslate, translate],
  );
  const [superHeroState, dispatch] = useReducer(superHeroReducer, initialState);

  const onAddOrEditOrView = useCallback(
    (item?: SuperHero, view = false) => {
      if (item) {
        dispatch({
          type: '[SuperHero] set selected',
          payload: { superHero: item },
        });
        navigate(`/superheroes/detail/${item?.id}`, { state: { view } });
        return;
      }
      navigate('/superheroes/detail');
    },
    [navigate],
  );

  const onDelete = useCallback(
    async (item: SuperHero) => {
      const id = item.id as string;

      const { isError } = await exec({
        url: `${resourceUrl}/${id}`,
        method: 'delete',
        showErrorMessage: true,
        resourceName: toastParam,
      });

      if (isError) return;

      dispatch({ type: '[SuperHero] delete', payload: { id } });
      enqueueSnackbar(
        translate('globals.toasts.delete.success', { value: toastParam }),
        {
          variant: 'success',
          anchorOrigin: ANCHOR_ORIGIN,
        },
      );
    },
    [enqueueSnackbar, exec, toastParam, translate],
  );

  const getPage = useCallback(
    async (pageConfig: PageConfig<SuperHero>) => {
      const { data, isError, count } = await exec({
        url: resourceUrl,
        method: 'get',
        params: createHttpParams<SuperHero>(pageConfig),
      });

      if (!data) return 0;
      const dataLength = (Array.isArray(data) && data?.length) || 100;
      dispatch({
        type: '[SuperHero] get page',
        payload: {
          superHeroes: isError || !data ? [] : (data as unknown as SuperHero[]),
        },
      });
      return count || dataLength;
    },
    [exec],
  );

  const setPageConfig = (pageConfig: PageConfig<SuperHero>) => {
    dispatch({
      type: '[SuperHero] set page config',
      payload: { pageConfig },
    });
  };

  const saveOrUpdate = useCallback(
    async (
      opType: string,
      superHero: SuperHero,
      selectedSuperHero?: SuperHero,
    ) => {
      const { data, isError } =
        opType === HTTP_METHOD_KEYS.put
          ? await exec({
              url: `${resourceUrl}/${selectedSuperHero?.id}`,
              method: 'put',
              data: { ...selectedSuperHero, ...superHero },
              showErrorMessage: true,
              resourceName: toastParam,
            })
          : await exec({
              url: resourceUrl,
              method: 'post',
              data: superHero,
              showErrorMessage: true,
              resourceName: toastParam,
            });

      if (isError || !data) return;

      dispatch({
        type:
          opType === HTTP_METHOD_KEYS.put
            ? '[SuperHero] update'
            : '[SuperHero] create',
        payload: { superHero: data as SuperHero },
      });
      enqueueSnackbar(
        translate(`globals.toasts.${opType}.success`, { value: toastParam }),
        {
          variant: 'success',
          anchorOrigin: ANCHOR_ORIGIN,
        },
      );
    },
    [enqueueSnackbar, exec, toastParam, translate],
  );

  return (
    <SuperHeroContext.Provider
      value={useMemo(
        () => ({
          superHeroState,
          columns,
          onAddOrEditOrView,
          onDelete,
          getPage,
          setPageConfig,
          saveOrUpdate,
        }),
        [
          columns,
          getPage,
          onAddOrEditOrView,
          onDelete,
          saveOrUpdate,
          superHeroState,
        ],
      )}
    >
      {children}
    </SuperHeroContext.Provider>
  );
};
