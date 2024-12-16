// import ('dotenv').config();
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

// console.log('Loaded Environment Variables:', {
//   DB_USER: process.env.DB_USER,
//   DB_NAME: process.env.DB_NAME,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;


