// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config()

export const dbConfig = {
  development: {
    client: 'sqlite3',
    connection: { filename: './db/myDB.sqlite' },
    useNullAsDefault: true,
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'ecommerce',
    },
  },
};

