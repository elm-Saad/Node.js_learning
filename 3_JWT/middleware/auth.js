const {UnAuth} = require("../errors")
const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next)=>{
    // console.log(req.headers.authorization);

    const AuthHeaders = req.headers.authorization

    if(!AuthHeaders || !AuthHeaders.startsWith('Bearer ')){
        throw new  UnAuth('no valid token provided')
    }

    const token = AuthHeaders.split(' ')[1]

    console.log('this is the token: ' + token)
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // the data in the token
        const {id,username} = decoded
        console.log(id);
        req.user = {id,username}
        next()
        
    } catch (error) {
        throw new UnAuth('not authorize to access this Route hhhh')
    }
}

module.exports = authMiddleware