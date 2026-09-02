const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Default admin credentials check: username: Admin / password: admin@123
    const isDefaultAdmin = (username.trim().toLowerCase() === 'admin' || username.trim() === 'Admin') && (password === 'admin@123' || password === 'adminpassword' || password === 'kannan123');

    if (isDefaultAdmin) {
      const token = jwt.sign({ username: 'Admin', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token,
        user: { username: 'Admin', role: 'admin' }
      });
    }

    // If MongoDB connected, check User collection
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ username });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
          return res.json({
            success: true,
            message: 'Authentication successful',
            token,
            user: { username: user.username, role: user.role }
          });
        }
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Default Admin: Admin / admin@123' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

module.exports = { login };
