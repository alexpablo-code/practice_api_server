const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
require('dotenv').config();

const path = require('path');
//still learning how to use path, to help us with path of files 

const PORT = process.env.PORT || 8000
const {logger} = require('./middleware/logger')
//This can be useful for keeping track of incoming requests and troubleshooting issues with your server.

app.use(logger)

app.use(cors(corsOptions)) // also how to allow anyone to use online ordering but restric admin access?
app.use(cookieParser())
app.use(express.json(), express.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'public')));
//listening on the root route '/', telliing express where to find static files like a css file or image that we would use on the server
//TO SERVE STATIC FILES/ STATIC PAGES THAT DON'T CHANGE DYNAMICALLY, improve performance by reducing load on server, simply return file without having to run any server side code





// require('./routes/menu.routes')(app);
//this is what we used to use, acceptable and it works but for organization and avoid route conflits we will use EXPRESS.ROUTER()
const menuRouter = require('./routes/menu.routes');
app.use('/menu', menuRouter);
//By mounting the router to the /menu path, we are essentially telling our application that any routes 
//defined in menu.routes.js should be considered to be part of the /menu section of our application

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else{
        res.json({message: '404 Not Found'})
    }
})

app.use(errorHandler);


app.listen(PORT, () => console.log(`The server is all fired up on port ${PORT}`));
