const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors());
app.use(express.json());


//Configuration of the Database to our server.
const dataBaseURL = "mongodb+srv://Nithish:4TWKyEiBERfBzkPT@cluster0.crr88.mongodb.net/";

mongoose.connect(dataBaseURL)
    .then(() => {
        console.log("Mongo DATABASE established");
    })
    .catch(() => {
        console.log('failed to connect to database');
    })
    ;

//requiring routes
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const expenseRouter = require('./routes/expenseRouter');


app.use('/api/user', userRouter);
app.use('/api/group', groupRouter);
app.use('/api/expense', expenseRouter);

var port = 8560;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;