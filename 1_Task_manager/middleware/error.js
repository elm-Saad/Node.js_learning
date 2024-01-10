const errorHandleMiddleware = (err,req,res,next)=>{
    return res.status(500).json({msg:'something went wrong tray again later'})
}

module.exports = errorHandleMiddleware