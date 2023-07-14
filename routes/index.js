const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');
const likesRouter = require('./likes.route');

router.use('/', [authRouter]);
router.use('/posts/', [likesRouter, postsRouter, commentsRouter]);

module.exports = router;