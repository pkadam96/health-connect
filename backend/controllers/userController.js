const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {

  const { name, email, password, gender, dob, role, department_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({name,email,password: hashedPassword,gender,dob,role,department_id
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.userId, name: newUser.name, email: newUser.email, gender: newUser.gender, dob: newUser.dob, role: newUser.role, department_id: newUser.department_id
      }
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {userId: user.userId, name: user.name, email: user.email, role: user.role}, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.userId, name: user.name, email: user.email, role: user.role}
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};