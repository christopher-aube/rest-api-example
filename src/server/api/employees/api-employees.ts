import express from 'express';
import data from '../../data/employees.json';
import { EmployeeData } from './employees.types';
import { create } from './employees';

export const Route = '/employees';

export const init = (router: express.Router) => {
  const employeeData: Array<EmployeeData> = data;

  router.get(Route, (req, res) => {
    res.send(employeeData);
  });

  router.get(`${Route}/:id`, (req, res) => {
    res.send(employeeData[0]);
  });

  router.post(`${Route}/create`, (req, res) => {
    const createRes = create(req.body, employeeData);

    if (createRes.error || !createRes.data) {
      res.status(400);
      res.send(createRes);
      return;
    }

    employeeData.push(createRes.data.employee);
    res.status(200);
    res.send(createRes.data.employee);
  });
};
