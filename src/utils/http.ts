import { StringOrNumber } from 'types';
import http from 'config/httpCommon';
import { ObjectIndexer } from 'interfaces';

const getAll = (endpoint: string) => {
  return http.get(endpoint);
};

const get = (endpoint: string, id: StringOrNumber) => {
  return http.get(`/${endpoint}/${id}`);
};

const create = <T>(endpoint: string, data: T) => {
  return http.post(`/${endpoint}`, data);
};

const update = <T extends ObjectIndexer<any>>(endpoint: string, data: T) => {
  return http.put(`/${endpoint}/${data.id}`, data);
};

const remove = (endpoint: string, id: StringOrNumber) => {
  return http.delete(`/${endpoint}/${id}`);
};

export { getAll, get, create, update, remove };
