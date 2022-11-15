import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
const sequelize = new Sequelize(connectionString);

export default sequelize;
