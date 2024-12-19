import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import User from '../models/user.js';
import jwt from 'jsonwebtoken';



router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create(email, hashedPassword);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// New login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    // console.log("this is user: ", user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If everything is correct, send success response
    // In a real application, you would generate and send a token here
    const SECRET_KEY = 'hi';
    // console.log ("this is user: ", user.user_id); //user is getting passed correctly from here
    const token = jwt.sign({
      user: {
        email: user.email,
        user_id: user.user_id
      }
    }, SECRET_KEY, { expiresIn: '1h' });    
    // console.log('token: ', token);

    res.json({ 
      message: 'Login successful', 
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
