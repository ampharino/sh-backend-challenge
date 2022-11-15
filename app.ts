import express, { Express, Request, Response } from 'express';
import sequelize from './database';

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
testConnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
