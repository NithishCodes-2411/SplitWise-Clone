const express = require('express');
const app = express();

const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors());
app.use(express.json());


//Configuration of the Database to our server.
const dataBaseURL = "mongodb+srv://nituu2411:iNKEbvDwdCPBp4hA@cluster0.tqmdo7f.mongodb.net/";

mongoose.connect(dataBaseURL)
    .then(() => {
        console.log("Mongo DATABASE established");
    })
    .catch(() => {
        console.log('failed');
    })
    ;

//requring routes
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const expenseRouter = require('./routes/expenseRouter');


app.use('/api/user', userRouter);
app.use('/api/group', groupRouter);
app.use('/api/expense', expenseRouter);


app.listen(5000, () => {
    console.log('Server started on port 5000');
});

module.exports = app;