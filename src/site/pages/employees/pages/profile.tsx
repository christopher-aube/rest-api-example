import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { id } = useParams();
  console.log('profile page');
  return <div>profile page: {id}</div>
};

export default {
  Profile,
};
