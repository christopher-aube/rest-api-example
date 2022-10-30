import express from 'express';
import employeeData from '../../data/employees.json';

export const Route = '/employees';

export const init = (router: express.Router) => {
  router.get(Route, (req, res) => {
    res.send(employeeData);
  });

  router.get(`${Route}/:id`, (req, res) => {
    res.send(employeeData[0]);
  });
};
