const mongoose = require('mongoose');
const API_SECRET = process.env.API_SECRET

mongoose.connect(`mongodb+srv://ronyalexis0:${API_SECRET}@cluster0.zmn0nzm.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



    .then(() => console.log('Established a connection to the Database'))
    .catch(err => console.log('Something went wrong when connecting to the database', err));