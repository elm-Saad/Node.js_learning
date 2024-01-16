const CustomAPIError = require("../errors/custom-error");

const jwt = require('jsonwebtoken')

const login = async (req,res)=>{
    const {username,password} = req.body
    console.log(username +' || '+ password);
      // db validation
    //joi 

    // data validation
    if(!username || !password){
        // any throw error is handled from errorhandler middleware
        throw new CustomAPIError('please provide name and password',400)
    }

    //
    const id = 91286176286
    // jwt sign
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'user created',token:token})
}

const dashboard = async (req,res)=>{
    // headers
    console.log(req.headers);
    const AuthHeaders = req.headers.authorization

    if(!AuthHeaders || !AuthHeaders.startsWith('Bearer ')){
        throw new CustomAPIError('no valid token provided',401)
    }

    const token = AuthHeaders.split(' ')[1]

    console.log('this is the token: ' + token)

    // verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // the data in the token
        console.log(decoded);
        const randNum = Math.floor(Math.random()*100) + 1
        res.status(200).json({msg:'hi ' + decoded.username +' ',secret:'your number is : ' + randNum})
    } catch (error) {
        throw new CustomAPIError('not authorize to access this Route',401)
    }
}

module.exports = {login,dashboard}