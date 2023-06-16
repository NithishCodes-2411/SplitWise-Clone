const model = require('../models/schema');
const bcrypt = require('bcrypt');
const apiAuthentication = require('../helpers/tokenGenerator');

/* API name : /api/user/login
Accepts : UserName and password
*/

const login = async(req, res) => {
    try {

        //Checking if the user exist
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })

        if(!user){
            return res.status(401).json({
                message : "Invalid email id or password"
            })
        }
        
        //validating password using bcrypt
        const validCard = await bcrypt.compare(req.body.password , user.password);
        if(!validCard){
            return res.status(401).json({
                message : "Invalid email id or password"
            })
        }
        else{

            //generating a json web token
            const accessToken = apiAuthentication.generateAccessToken(req.body.emailId);
            res.status(200).json({
                message: "User Login Success",
                accessToken : accessToken
            })

        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }
}


module.exports = login;