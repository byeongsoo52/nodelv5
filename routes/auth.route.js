const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

// 회원가입 API
router.post('/signup', authController.signup);

// 로그인 API
router.post('/login', authController.login);

module.exports = router;