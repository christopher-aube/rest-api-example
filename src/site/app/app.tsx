import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './_app.scss';
import { PageConfigs } from './app.types';
import * as pageConfigs from '../pages';

const employeesPageRoute = pageConfigs.Employees.Path.replace('*', '');

export const App = () => {
  const configs = pageConfigs as PageConfigs;
  const configKeys = Object.keys(configs);

  return (
    <Router>
      <Routes>
        {
          configKeys.map((name: string, idx: number) => {
            const config = configs[name];
            
            return <Route key={idx} path={config.Path} element={<config.Page />} />
          })
        }
        <Route path="*" element={<Navigate to={employeesPageRoute} />} />
      </Routes>
    </Router>
  );
};

export default {
  App,
};