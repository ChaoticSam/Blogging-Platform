const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getUsers); // Add this route to fetch users

module.exports = router;
