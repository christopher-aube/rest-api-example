import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { init as initApi } from './api';

const app = express();
const port = process.env.SERVER_PORT || '1234';

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initApi(app);

app.listen(port, () => {
  console.log(`App server up on: http://localhost:${port}/`);
});
