const express = require('express');
const { createProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../utils/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, createProfile);

module.exports = router;