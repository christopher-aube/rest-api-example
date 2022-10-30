import express from 'express';
import cors from 'cors';
import employeeData from './data/employees.json';

const app = express();
const port = process.env.SERVER_PORT || '1234';

app.use(cors({ credentials: true, origin: true }));
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send(employeeData);
});

app.listen(port, () => {
  console.log(`App server up on: http://localhost:${port}/`);
});
