const model = require('../models/userSchema');
const bcrypt = require('bcrypt');
const apiAuthentication = require('../helpers/tokenGenerator');

const exp = require('../models/expenseSchema');
const set = require('../models/settlementSchema');

/* 
API name : /api/user/login
Accepts : UserName and password
sample req.body : {
    emaiId : "nituuu2411@gmail.com" , 
    password : "sjbdwfnfn"
} 
*/

const login = async (req, res) => {
    try {

        //Checking if the user exist
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })

        if (!user) {
            let err = new Error();
            err.status = 401;
            err.message = "Invalid email or password";
            throw err;
        }

        //validating password using bcrypt
        const validCard = await bcrypt.compare(req.body.password, user.password);
        if (!validCard) {
            let err = new Error();
            err.status = 401;
            err.message = "Invalid email or password"
            throw err;
        }
        else {

            //generating a json web token
            const accessToken = apiAuthentication.generateAccessToken(req.body.emailId);
            res.status(200).json({
                message: "User Login Success",
                accessToken: accessToken ,
                email: req.body.emailId

            })

        }
    }
    catch (err) {
        //console.log(err);
        res.status(err.status).json({
            message: err.message
        });
    }
}


module.exports = login;