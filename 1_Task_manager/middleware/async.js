const asyncWrapper  = (fn)=>{
    return async (req,res,next) =>{
        try {
            await fn(req,res,next)
        } catch (error) {
            // handled by the default error handler from express
            next(error)
        }
    }
}

module.exports = asyncWrapper