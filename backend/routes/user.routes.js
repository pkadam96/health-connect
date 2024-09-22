const express = require('express');
const { register, login, dashboard, fetchDoctorsByDepartment } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/dashboard', authMiddleware, dashboard);

router.get('/doctors/:deptId', fetchDoctorsByDepartment);

module.exports = router;
