const express = require('express')
const router = express.Router()

const Auth = require('../controller/Auth')

router.post('/register', Auth.register)
router.post('/login', Auth.login)
router.post('/refresh-token', Auth.refreshToken)

module.exports = router;