import React, { useState, useEffect } from 'react';
import * as css from './_home.scss';
import { Employees } from '../../models';

export const Path = '/home';

export const Page = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState('');

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
      .then(() => {
        console.log('created');
        handleUpdateEmployees();
      })
      .catch((e) => {
        console.error('failed to create employee');
      });
  };

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
    <div className={css.homePage}>
      <aside className={css.employeeForm}>

       <div className={css.control}>
        <input type="text" placeholder="...Search employees" />
       </div>

        <div>
          <form>
            <div className={css.control}>
              <label htmlFor="employee-email">Email</label>
              <input type="text" id="employee-email" value={email} onChange={handleEmailUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-first-name">First Name</label>
              <input type="text" id="employee-first-name" value={firstName} onChange={handleFirstNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-last-name">Last Name</label>
              <input type="text" id="employee-first-name" value={lastName} onChange={handleLastNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-department">Department</label>
              <input type="text" id="employee-department" value={department} onChange={handleDepartmentNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-salary">Salary</label>
              <input type="number" id="employee-salary" value={salary} onChange={handleSalaryNameUpdate}/>
            </div>

            <div className={css.control}>
              <label htmlFor="employee-status">Status</label>
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  )
};

export default {
  Path,
  Page,
}