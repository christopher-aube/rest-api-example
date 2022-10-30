import express from 'express';
import * as employees from './employees';

export const Route = '/api/v1';

export const init = (app: express.Application) => {
  const router = express.Router();

  employees.init(router);
  app.use(Route, router);
};

export default {
  Route,
  init,
};
