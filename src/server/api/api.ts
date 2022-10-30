import express from 'express';
import * as employees from './employees';

export const init = (app: express.Application) => {
  const router = express.Router();

  employees.init(router);
  app.use('/api/v1', router);
};

export default {
  init,
};
