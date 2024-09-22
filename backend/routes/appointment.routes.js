const express = require('express');
const { bookAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/book-appointment', authMiddleware, bookAppointment);

module.exports = router;
