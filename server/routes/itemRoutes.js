import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = decoded.user;

    next();
  });
};

//GET
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { rows } = await pool.query('SELECT * FROM items WHERE user_id = $1', [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


//POST
router.post('/', authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const user_id = req.user.user_id;
    const { rows } = await pool.query(
      'INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, user_id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const user_id = req.user.user_id;
    const { rows } = await pool.query(
      'DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, user_id]
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

//UPDATE
router.patch('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const user_id = req.user.user_id;
    const { rows } = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, description, id, user_id]
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

