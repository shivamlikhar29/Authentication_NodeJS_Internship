const express = require('express');

const { getUsers, forgotPassword, loginUser, registerUser, updatedPassword, newPassword } = require('../controllers/users')

const router = express.Router();

router.get('/auth',getUsers)
router.post('/auth',registerUser)
router.post('/auth/login',loginUser)
router.post('/auth/forget-password',forgotPassword)
router.get('/auth/forget-password/:id/:token', updatedPassword)
router.post('/auth/forget-password/:id/:token', newPassword)

module.exports = router