

class CustomAPIError extends Error{
    constructor (message, statusCode){
        super(message) // invokes the constructor as  parent class
        this.statusCode = statusCode // each time change base on the upcoming status code
    }
}

const createCustomError = (msg,statusCode) => {
    return new CustomAPIError(msg,statusCode)
}

module.exports = {createCustomError, CustomAPIError}
