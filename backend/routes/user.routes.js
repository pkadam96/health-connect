// routes/userRoutes.js

const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Register a new user
router.post('/register', register);

// User login
router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);

module.exports = router;
