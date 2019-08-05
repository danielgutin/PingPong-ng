const express = require('express');
const router = express.Router();

// Different Routers.
const login = require('./login');
const system = require('./system');

// Define the roots for the different routes.
router.use('/login', login);
router.use('/system', system);

module.exports = router;