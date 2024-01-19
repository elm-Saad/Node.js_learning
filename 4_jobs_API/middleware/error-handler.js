const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {



  /** */
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  /**
   * the global err have object containing bunch of props => send custom err msg 
   * and status base on the err.(name / code ) 
   * to see the full object use 
   * if (err instanceof CustomAPIError) {
   *  return res.status(err.statusCode).json({ msg: err.message })
   * }
   * 
   * because CustomAPIError is a instanceof error (global one)
   */

  // handle validation err coming from DB  cause of a ValidationError to be custom
  if (err.name === 'ValidationError') {
    // console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',')

    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }

  // 
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  /** */



  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
