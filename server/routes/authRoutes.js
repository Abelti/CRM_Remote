const express = require('express');
const { registerUser, activateUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/activate', activateUser);

module.exports = router;