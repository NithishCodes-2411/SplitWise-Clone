const userModel = require('../models/userSchema');
const bcrypt = require('bcrypt');

/* API Name : api/user/resetPassword
ACCEPTS : emailID , newPassword & answer for security Question

This function checks if the answwer for thr secuirty question is right or wring. If it is rigth , then change it password.
Sample req.body : {
    "emailID" : "user1@example.com" ,
    "oldPassword" : "jsbvjkdsvn" ,
    "newPassword" : "hbfiwdfbhbh"
}
*/

const resetPassword = async (req, res) => {
    const emailId = req.body.emailID;
    const newPassword = req.body.newPassword;
    const oldPass = req.body.oldPassword;

    console.log(emailId +"  " + newPassword+" "+ oldPass);

    try {

        const user = await userModel.User.findOne({ emailId: emailId });

        if (!user) {
            let err = new Error();
            err.status = 401;
            err.message = "User not found"
            throw err;
           
        }

         //validating password using bcrypt
         const validCard = await bcrypt.compare(oldPass, user.password);
         console.log(validCard)
         if (validCard === false) {
             let err = new Error();
             err.status = 401;
             err.message = "Wrong old Password"
             throw err;
         }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            mesaage: "Password reset sucessfull"
        })

    }
    catch (err) {
        console.log(err + "backendddd catch   ")
        res.status(err.status).json({
            message: err.message
        });
        
    }
}

module.exports = resetPassword;