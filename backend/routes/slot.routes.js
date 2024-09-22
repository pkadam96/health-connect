const express = require('express');
const router = express.Router();
const { getSlotsByDoctor } = require('../controllers/slotController');


router.get('/slots/:doctorId', getSlotsByDoctor);

module.exports = router;
