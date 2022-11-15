import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'postgres',
  },
};

export default dbConfig;
