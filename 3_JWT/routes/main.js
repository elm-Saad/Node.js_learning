const express = require('express')
const { login, dashboard } = require('../controllers/main')
const router = express.Router()

// auth  access


const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)


router.route('/login').post(login)

module.exports = router