import { EmployeeData, EmployeeSearchParams } from './model-employees.types';
import { rq } from '../../services';

const Route = '/employees';

export const get = (id?: string) => {
  if (id) {
    return rq.get(`${Route}/${id}`);
  }

  return rq.get(Route);
};

export const create = (data: EmployeeData) => {
  return rq.post(`${Route}/create`, data);
};

export const search = (params: EmployeeSearchParams) => {
  return rq.post(`${Route}/search`, params);
};

export default {
  get,
  create,
};
