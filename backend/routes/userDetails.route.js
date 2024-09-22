// routes/userRoutes.js

const express = require('express');
const { doctors, fetchDoctorsByDepartment } = require('../controllers/doctorDetailsController');

const router = express.Router();

router.get('/doctors', doctors);

module.exports = router;
