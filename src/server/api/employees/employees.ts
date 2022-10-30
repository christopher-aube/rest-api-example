import { v4 as uuidv4 } from 'uuid';
import { EmployeeData, EmployeeSearchParams } from './employees.types';
import { datetime } from '../../utils';
import { validator } from '../../services';

export const create = (
  { email, firstName, lastName, department, salary, status }: EmployeeData,
  employees: Array<EmployeeData>
) => {
  const hasEmail = validator.notEmpty(email);
  const hasFirstName = validator.notEmpty(firstName);
  const hasLastName = validator.notEmpty(lastName);
  const hasDepartment = validator.notEmpty(department);
  const hasSalary = validator.notEmpty(salary);
  const hasStatus = validator.notEmpty(status);
  const isDefined =
    hasEmail &&
    hasFirstName &&
    hasLastName &&
    hasDepartment &&
    hasSalary &&
    hasStatus;

  if (!isDefined) {
    let msg = 'Unable to create employee - the following fields are required: ';

    if (!hasEmail) {
      msg += 'Email, ';
    }

    if (!hasFirstName) {
      msg += 'First Name, ';
    }

    if (!hasLastName) {
      msg += 'Last Name, ';
    }

    if (!hasDepartment) {
      msg += 'Department, ';
    }

    if (!hasSalary) {
      msg += 'Salary, ';
    }

    if (!hasStatus) {
      msg += 'Status, ';
    }

    return {
      error: true,
      message: msg,
    };
  }

  const isEmailUnique = validator.isUnique(employees, 'email', email);

  if (!isEmailUnique) {
    return {
      error: true,
      message: 'Unable to create employee - email must be unique',
    };
  }

  const employee = {
    employeeId: uuidv4(),
    createdAt: datetime.now(),
    email,
    firstName,
    lastName,
    department,
    salary,
    status,
  };

  return {
    error: false,
    data: {
      employee,
    },
  };
};

export const search = (
  params: EmployeeSearchParams,
  employees: Array<EmployeeData>
) => {
  let sortBy = ['firstName', 'lastName'];
  const validSortFields = [
    'email',
    'firstName',
    'lastName',
    'department',
    'salary',
    'status',
    'createdAt',
  ];
  const filteredList: Array<EmployeeData> = [];

  const checkValidSorts = (field: string) => {
    return validSortFields.indexOf(field) !== -1;
  };

  if (params.sortBy && params.sortBy.length) {
    sortBy = params.sortBy.filter(checkValidSorts);
  }

  return {
    error: false,
    data: {
      employees: filteredList,
    },
  };
};

export default {
  create,
  search,
};
