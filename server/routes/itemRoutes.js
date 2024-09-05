import express from 'express';
const router = express.Router();
import pool from '../db.js'; 

// Get all items
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// module.exports = router;

export default router;
