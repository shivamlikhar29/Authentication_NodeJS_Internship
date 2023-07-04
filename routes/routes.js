const express = require('express');
const { getUsers, forgotPassword, loginUser, registerUser } = require('../controllers/users')

const router = express.Router();

router.get('/',getUsers)
router.post('/',registerUser)
router.post('/login',loginUser)
router.patch('/forget-password',forgotPassword)

module.exports = router