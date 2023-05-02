const {logEvents} = require('./logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)
    //err.stack details about an error and location

    const status = res.statusCode ? res.statusCode : 500 // server error 
    //if the response we recieve here already has an error code, then send back that error code, otherwise send back 500

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler 