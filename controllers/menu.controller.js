const path = require('path');

module.exports = {
    firstReq: (req, res) => {
        // res.sendFile('../views/index.html')

        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
        //this way is considered more reliable and robust than using a relative file path, this ensures that
        //the path is constructed correctly and is compatible with the operating system runnning the application
    }
}