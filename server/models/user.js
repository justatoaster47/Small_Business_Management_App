import dotenv from 'dotenv';
import db from '../knex.js';
dotenv.config();

class User {

  static async create(email, password_hash) {
    try {
      const [newUser] = await db('users')
        .insert({ email, password_hash })
        .returning('*'); // Return the entire inserted row (or just the specific columns you need)
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
    const result = await db('users')
        .where({ email: email});
      return result[0];
    } catch (error) {
      throw error;
    }
  }

}

export default User;
