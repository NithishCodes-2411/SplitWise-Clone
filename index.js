const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors());
app.use(express.json());


//Configuration of the Database to our server.
const dataBaseURL = "mongodb+srv://nituu2411:UoM96J6wpblKMhiZ@cluster0.tqmdo7f.mongodb.net/?retryWrites=true&w=majority";

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


app.use('/api/user' , userRouter);
app.use('/api/group' , groupRouter);

   
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

module.exports = app;