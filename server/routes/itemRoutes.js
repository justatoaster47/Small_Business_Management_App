import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();
const SECRET_KEY = 'hi'; // Replace with your actual secret key


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    // Attach the user object from the decoded payload to req.user
    req.user = decoded.user; // Access the `user` object here
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id; // Assumes the JWT contains `userId`
    console.log("userID1: ", userId);
    const { rows } = await pool.query('SELECT * FROM items WHERE user_id = $1', [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// //this functions
// router.get('/', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM items WHERE user_id = $1', [1]);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// Add a new item for the logged-in user
router.post('/', authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const userId = req.user.userId; // Assumes the JWT contains `userId`
    const { rows } = await pool.query(
      'INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an item (only if it belongs to the logged-in user)
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const userId = req.user.userId; // Assumes the JWT contains `userId`
    const { rows } = await pool.query(
      'DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an item (only if it belongs to the logged-in user)
router.patch('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const userId = req.user.userId; // Assumes the JWT contains `userId`
    const { rows } = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, description, id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

