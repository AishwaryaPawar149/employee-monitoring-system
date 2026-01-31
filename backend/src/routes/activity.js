const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Agent logs activity
router.post('/log', activityController.log);

// Admin / Employee fetch today's activity
router.get('/today/:id', activityController.today);

module.exports = router;
