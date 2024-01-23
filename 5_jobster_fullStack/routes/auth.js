const express = require('express')
const router = express.Router()

const { register, login, UpdateUser } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')
const rateLimiter = require('express-rate-limit')
/** API Limiter*/
/**
 * just for register and login 
 * if someone Login or register from the same Ip many many times
 */

const ApiLimiter = rateLimiter({
    windowMs: 15*60*1000,// 15 min
    max:10,
    message:{
        msg:'Too many request from this Ip , please try again after 15 minutes'
    }
})


router.post('/register',ApiLimiter, register)
router.post('/login',ApiLimiter, login)

/**
 * the update user is authenticated route on {{url}}/auth/updateUser
 * this is way its here
 * 
 * Restrict UpdateUser for Test user
 */
router.patch('/updateUser',authenticateUser,testUser,UpdateUser)


module.exports = router
