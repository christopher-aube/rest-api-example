import { v4 as uuidv4 } from 'uuid';
import { EmployeeData } from './employees.types';
import { datetime } from '../../utils';

export const create = ({ employeeId, createdAt, ...data }: EmployeeData) => {
  const employee = {
    employeeId: uuidv4(),
    createdAt: datetime.now(),
    ...data,
  };

  return employee;
};

export default {
  create,
};
