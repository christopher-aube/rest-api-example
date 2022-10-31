import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as css from '../_employees.scss';
import { Employees } from '../../../models';

const ProfileCard = ({ profile }: { profile: Employees.EmployeeData }) => {
  const {
    employeeId,
    email,
    firstName,
    lastName,
    department,
    salary,
    status,
    createdAt
  } = profile;

  return (
    <div className={css.employeeCard}>
      <h1>{firstName} {lastName}</h1>

      <div>
        <div className={css.info}>
          <div className={css.label}>email</div>
          <div>{email}</div>
        </div>
        <div className={css.info}>
          <div className={css.label}>department</div>
          <div>{department}</div>
        </div>
        <div className={css.info}>
          <div className={css.label}>salary</div>
          <div>{salary}</div>
        </div>
        <div className={css.info}>
          <div className={css.label}>status</div>
          <div>{status}</div>
        </div>
        <div className={css.info}>
          <div className={css.label}>created at</div>
          <div>{createdAt}</div>
        </div>
        <div className={css.info}>
          <div className={css.label}>id</div>
          <div>{employeeId}</div>
        </div>
      </div>
    </div>
  )
};

const ProfileNotFound = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Profile not found.</h1>

      <div>
        <p>This profile: {id}, could not be located</p>
      </div>
    </>
  )
};

export const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState<Employees.EmployeeData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isLoading || isReady) {
      return;
    }

    Employees.get(id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        switch (res.status) {
          case 404:
            setNotFound(true);
            break;
        }
      })
      .then((data) => {
        setData(data);
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Failed to get data', e);
      })

    return () => {
      setIsLoading(true);
    }
  }, [isLoading, isReady]);

  return (
    <main className={css.employeesPage}>
      <div className={css.backLink}>
        <Link to="/employees">Back to all Employees</Link>
      </div>
      {!isReady ?
        <></> :
        (notFound ?
          <ProfileNotFound /> :
          <ProfileCard profile={data} />
        )
      }
    </main>
  )
};

export default {
  Profile,
};
