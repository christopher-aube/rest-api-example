import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PageConfigs } from './app.types';
import * as pageConfigs from '../pages';

const homePageRoute = pageConfigs.Home.Path;

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
        <Route path="*" element={<Navigate to={homePageRoute} />} />
      </Routes>
    </Router>
  );
};

export default {
  App,
};