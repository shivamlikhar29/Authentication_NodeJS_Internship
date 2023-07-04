const express = require('express');
const { getUsers, forgotPassword, loginUser, registerUser, updatedPassword, newPassword } = require('../controllers/users')

const router = express.Router();

router.get('/',getUsers)
router.post('/',registerUser)
router.post('/login',loginUser)

router.post('/forget-password',forgotPassword)
router.get('/forget-password/:id/:token', updatedPassword)
router.post('/forget-password/:id/:token', newPassword)

module.exports = router