import { EmployeeData } from './model-employees.types';
import { rq } from '../../services';

const Route = '/employees';

export const get = () => {
  return rq.get(Route);
};

export const create = (data: EmployeeData) => {
  return rq.post(`${Route}/create`, data);
};

export default {
  get,
  create,
};
