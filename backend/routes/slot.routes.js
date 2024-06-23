const express = require('express');
const router = express.Router();
const {createSlot, getSlotsByDoctor, updateSlot, deleteSlot} = require('../controllers/slotController');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Doctor Routes
router.post('/create', authMiddleware, roleMiddleware('doctor'), createSlot);
router.get('/slots', authMiddleware, getSlotsByDoctor);
router.put('/update/:slotId', authMiddleware, roleMiddleware('doctor'),updateSlot);
router.delete('/delete/:slotId', authMiddleware, roleMiddleware('doctor'), deleteSlot);

module.exports = router;
