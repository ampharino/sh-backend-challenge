const dotenv = require('dotenv');

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

module.exports = dbConfig;
