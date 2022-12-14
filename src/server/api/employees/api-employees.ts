import express from 'express';
import data from '../../data/employees.json';
import { EmployeeData } from './employees.types';
import { list } from '../../utils';
import { create, search } from './employees';

export const Route = '/employees';

export const init = (router: express.Router) => {
  const employeeData: Array<EmployeeData> = data;

  router.get(Route, (req, res) => {
    res.send(list.sortBy(employeeData, ['firstName']));
  });

  router.get(`${Route}/:id`, (req, res) => {
    const id = req.params.id;
    const idx = list.indexOf(employeeData, 'employeeId', id);

    if (idx === -1) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.send(employeeData[idx]);
    }
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

  router.post(`${Route}/search`, (req, res) => {
    const searchRes = search(req.body, employeeData);

    if (searchRes.error || !searchRes.data) {
      res.status(400);
      res.send(searchRes);
      return;
    }

    res.status(200);
    res.send(searchRes.data.employees);
  });
};
