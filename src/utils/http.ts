import { StringOrNumber } from 'types';
import { instances } from 'config/httpCommon';
import { PageConfig } from 'interfaces';

// TODO: remove this file when create axios hook

const getPage = <T>(endpoint: string, pageConfig: PageConfig<T>) => {
  const config: Record<string, Record<string, unknown>> = {
    params: {},
  };
  const { page, rowsPerPage, orderBy, order, filter } = pageConfig;
  config.params = {
    _page: page + 1,
    ...(rowsPerPage > 0 && { _limit: rowsPerPage }),
    _sort: orderBy as string,
    _order: order,
  };

  if (filter && filter.length > 0) {
    config.params.name_like = filter;
  }

  return instances[0].get(endpoint, config);
};

const getAll = (endpoint: string) => {
  return instances[0].get(endpoint);
};

const get = (endpoint: string, id: StringOrNumber) => {
  return instances[0].get(`/${endpoint}/${id}`);
};

const create = <T>(endpoint: string, data: T) => {
  return instances[0].post(`/${endpoint}`, data);
};

const update = <T extends Record<string, any>>(endpoint: string, data: T) => {
  return instances[0].put(`/${endpoint}/${data.id}`, data);
};

const remove = (endpoint: string, id: StringOrNumber) => {
  return instances[0].delete(`/${endpoint}/${id}`);
};

export { getPage, getAll, get, create, update, remove };
