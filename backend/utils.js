exports.logApi = function(req, statuscode, error){
    if (statuscode==500){
        console.error(`${req.originalUrl}->${error.message}`)
    }
}