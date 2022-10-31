import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Employees } from '../../../models';

const ProfileCard = ({ profile }: { profile: Employees.EmployeeData }) => {
  const {
    email,
    firstName,
    lastName,
    department,
    salary,
    status,
    createdAt
  } = profile;

  return (
    <>
      <h1>{firstName} {lastName}</h1>

      <div>
        <div>
          <div>Email:</div>
          <div>{email}</div>
        </div>
        <div>
          <div>Department:</div>
          <div>{department}</div>
        </div>
        <div>
          <div>Salary</div>
          <div>{salary}</div>
        </div>
        <div>
          <div>Status</div>
          <div>{status}</div>
        </div>
        <div>
          <div>Created At:</div>
          <div>{createdAt}</div>
        </div>
      </div>
    </>
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
    <main>
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
