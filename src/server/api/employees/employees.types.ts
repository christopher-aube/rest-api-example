export type EmployeeData = Partial<{
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  salary: number;
  status: string;
  createdAt: string;
}>;

export type EmployeeSearchParams = {
  search: {
    firstName?: string;
    lastName?: string;
    department?: string;
    status?: string;
  };
  sortBy?: [keyof Omit<EmployeeData, 'employeeId'>];
};
