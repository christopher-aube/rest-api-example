import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Directory, Profile } from './pages';

export const Path = `/employees/*`
export const PathDirectory = '/';
export const PathProfile = '/:id';

export const Page = () => {
  return (
    <Routes>
      <Route path={PathDirectory} element={<Directory />} />
      <Route path={PathProfile} element={<Profile />} />
      <Route path="*" element={<Directory />} />
    </Routes>
  )
};

export default {
  Path,
  Page,
}