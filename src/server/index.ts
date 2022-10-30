import express from 'express';
import cors from 'cors';
import { init as initApi } from './api';

const app = express();
const port = process.env.SERVER_PORT || '1234';

app.use(cors({ credentials: true, origin: true }));
app.set('json spaces', 2);

initApi(app);

app.listen(port, () => {
  console.log(`App server up on: http://localhost:${port}/`);
});
