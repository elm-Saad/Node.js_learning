const express = require('express')
const router = express.Router()

const { register, login, UpdateUser } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')


router.post('/register', register)
router.post('/login', login)
/**(addThis) */

/**
 * the update user is authenticated route on {{url}}/auth/updateUser
 * this is way its here
 * 
 * Restrict UpdateUser for Test user
 */
router.patch('/updateUser',authenticateUser,testUser,UpdateUser)


module.exports = router
