const express = require('express');
const { doctors } = require('../controllers/doctorDetailsController');

const router = express.Router();

router.get('/doctors', doctors);

module.exports = router;
