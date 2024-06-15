const {STATUS_CODES} = require('./constant.utils.js');

module.exports = {


    successResponseData(res, message, data, extras, code = STATUS_CODES.OK) {
        
        const response = {
            message,
            data,
        }

        if (extras) {
            Object.assign(response, extras)
        }

        return res.status(code).json(response)
    },


    successResponseWithoutData(res, message, code = STATUS_CODES.OK) {

        return res.status(code).json({code, message});
    },

    errorResponseData(res ,data, message, code = STATUS_CODES.BAD_REQUEST) {

        const response = {
            data,
            error: message
        }
        return res.status(code).send(response)
    },


    errorResponseWithoutData(res, message, code = STATUS_CODES.BAD_REQUEST) {

        const response = {
            code,
            error: message
        }
        
        return res.status(code).json(response);
    },


    joiErrorResponseData(res, err, code = STATUS_CODES.BAD_REQUEST){
        let error = {}
        if (err.name == 'ValidationError' && err.isJoi) {
            error.error_message = err.message.replace(/"/g, "");
        }
        const response = {
            code,
            error: error.error_message
        }
        return res.status(code).json(response);
    },
    
    
    
}