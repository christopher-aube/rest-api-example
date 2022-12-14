import React, { useState, useEffect, useRef } from 'react';
import * as css from '../_employees.scss';
import { Employees } from '../../../models';

export const Directory = () => {
  const [data, setData] = useState<Array<Employees.EmployeeData>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState('');
  let searchTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleSearchEmployees = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    if (searchTimeout) {
      clearTimeout(searchTimeout.current);
    }

    setSearchTerms(val)

    searchTimeout.current = setTimeout(() => {
      Employees.search({
        search: {
          firstName: val,
          lastName: val,
          department: val,
          status: val,
        },
      }).then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.error('failed to search employees');
      })
    }, 250);
  };

  const handleCreateEmployee = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    Employees
      .create({
        email,
        firstName,
        lastName,
        department,
        salary,
        status,
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
         if (data.error) {
          alert(data.message);
          return;
         }

         handleUpdateEmployees();
      })
      .catch((e) => {
        console.error('failed to create employee');
      });
  };

  const displayFormat = (employees: Array<Employees.EmployeeData>) => {
    return (
      <>
      {`[`}
        {employees.map((employee) => {
          const profileLink = `/employees/${employee.employeeId}`;
          return (
            <div>
              &nbsp;&nbsp;{`{\n`}
              &nbsp;&nbsp;&nbsp;&nbsp;"employeeId": <a href={profileLink}>{employee.employeeId}</a>
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"email": {employee.email}
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"firstName": {employee.firstName}
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"lastName": {employee.lastName}
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"department": {employee.department}
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"salary": {employee.salary}
              {`\n`}&nbsp;&nbsp;&nbsp;&nbsp;"status": {employee.status}
              {`\n`}&nbsp;&nbsp;{`}`}
            </div>
          );
        })}
      {`]`}
      </>
    )
  }

  const handleUpdateEmployees = () => {
    Employees.get()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Failed to get data', e);
      })
  }

  const handleEmailUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setEmail(val);
  };

  const handleFirstNameUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setFirstName(val);
  };

  const handleLastNameUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setLastName(val);
  };

  const handleDepartmentNameUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setDepartment(val);
  };

  const handleSalaryNameUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = parseInt(ev.currentTarget.value);

    setSalary(val);
  };

  const handleStatusNameUpdate = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setStatus(val);
  };

  useEffect(() => {
    if (isLoading || isReady) {
      return;
    }

    handleUpdateEmployees();

    return () => {
      setIsLoading(true);
    }
  }, [isLoading, isReady])

  return (
    <div className={css.employeesPage}>
      <aside className={css.employeeForm}>

       <div className={css.control}>
        <input type="text" className={css.search} placeholder="...Search employees" value={searchTerms} onChange={handleSearchEmployees}/>
       </div>

        <div>
          <form>
            <div className={css.control}>
              <label htmlFor="employee-email">email</label>
              <input type="text" id="employee-email" value={email} onChange={handleEmailUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-first-name">first name</label>
              <input type="text" id="employee-first-name" value={firstName} onChange={handleFirstNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-last-name">last name</label>
              <input type="text" id="employee-first-name" value={lastName} onChange={handleLastNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-department">department</label>
              <input type="text" id="employee-department" value={department} onChange={handleDepartmentNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-salary">salary</label>
              <input type="number" id="employee-salary" value={salary} onChange={handleSalaryNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-status">status</label>
              <input type="text" id="employee-status" value={status} onChange={handleStatusNameUpdate}/>
            </div>

            <div>
              <button type="submit" onClick={handleCreateEmployee}>Add Employee</button>
            </div>
          </form>
        </div>

        <div>
          <button onClick={handleUpdateEmployees}>Show All Employees</button>
        </div>
      </aside>
      <main className={css.employeeList}>
        <pre>{displayFormat(data)}</pre>
      </main>
    </div>
  )
};

export default {
  Directory,
};
