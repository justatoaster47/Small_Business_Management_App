// import ('dotenv').config();
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'small_business_management_app',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;


