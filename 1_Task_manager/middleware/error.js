const { CustomAPIError } = require("../errors/customError")



const errorHandleMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:'something went wrong, please try again'})
}

module.exports = errorHandleMiddleware