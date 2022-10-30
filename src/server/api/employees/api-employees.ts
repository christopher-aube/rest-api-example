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
    const employee = create(req.body);

    employeeData.push(employee);
    res.sendStatus(200);
  });
};
