const model = require('../models/userSchema');
const bcrypt = require('bcrypt');


/*
API name : /api/user/register
Accepts : firstName, lastName, emailId, password , answer for a sec question
Sample req.body : {
    "firstName" : "Nithish" , 
    "lastName" : "Thirunavukkasarsu" ,
    "emailId" : "nituu2411@hmail.com" ,
    "password" : "Nithish@2411" , 
    "securityQuestion" : "Halifax"
}
*/
const userRegistration = async (req, res) => {

    try {

        //Checking if the user exist already
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })

        if (user) {
            return res.status(400).json({
                message: "User already exist"
            })
        }
        else {
            let newUser = new model.User(req.body);

            //Bcrypt password encription
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt)

            //Creating new user in the database 
            let id = await model.User.create(newUser)
            res.status(200).json({
                message: "User Registeration Success"
            })
        }

    }
    catch (err) {

        //console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });

    }


}

module.exports = userRegistration;
