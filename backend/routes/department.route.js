const express = require('express');
const { departments } = require('../controllers/departmentController');

const router = express.Router();

router.get('/departments', departments);

module.exports = router;
