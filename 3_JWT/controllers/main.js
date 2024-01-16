const {BadRequest} = require("../errors");

const jwt = require('jsonwebtoken')

const login = async (req,res)=>{
    const {username,password} = req.body
    console.log(username +' || '+ password);
      // db validation
    //joi 

    // data validation
    if(!username || !password){
        // any throw error is handled from errorhandler middleware
        throw new BadRequest('please provide name and password')
    }

    //
    const id = 61481724764
    // jwt sign
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'user created',token:token})
}

const dashboard = async (req,res)=>{
    // headers
    const randNum = Math.floor(Math.random()*100) + 1
    res.status(200).json({msg:'hi ' + req.user.username +' ',secret:'your number is : ' + randNum})
}

module.exports = {login,dashboard}