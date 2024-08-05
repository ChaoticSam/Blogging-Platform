const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

// Post routes
router.post('/', auth, postController.createPost);
router.get('/', postController.getPosts);

module.exports = router;
