import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../knex.js';

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
    const user_id = req.user.user_id;

    const rows = await db('items')
      .select('*')
      .where({ user_id: user_id });

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

    const [item] = await db('items')
      .insert({name, description, user_id})
      .returning('*');

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const user_id = req.user.user_id;

    const deletedItem = await db('items')
      .where({ id, user_id })
      .del()
      .returning('*');

    if (deletedItem.length === 0) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    res.json(deletedItem[0]); // Send back the deleted item
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE (PATCH)
router.patch('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const user_id = req.user.user_id;

    const updatedItem = await db('items')
      .where({ id, user_id })
      .update({ name, description })
      .returning('*'); 

    if (updatedItem.length === 0) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    res.json(updatedItem[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



export default router;

