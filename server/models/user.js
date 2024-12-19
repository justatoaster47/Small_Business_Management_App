import dotenv from 'dotenv';
import pool from '../db.js';
dotenv.config();

class User {
  static async create(email, hashedPassword) {
    const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email';
    const values = [email, hashedPassword];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    
    try {
      const result = await pool.query(query, values);
      console.log("user id type: ", typeof result);
      return result.rows[0]; // this returns user id as an int
    } catch (error) {
      throw error;
    }
  }
}

export default User;
