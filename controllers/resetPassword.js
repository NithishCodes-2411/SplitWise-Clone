const userModel = require('../models/userSchema');
const bcrypt = require('bcrypt');

/* API Name : api/user/resetPassword
ACCEPTS : emailID , newPassword & answer for security Question

This function checks if the answwer for thr secuirty question is right or wring. If it is rigth , then change it password.
Sample req.body : {
    "emailID" : "user1@example.com" ,
    "answer" : "jsbvjkdsvn" ,
    "newPassword" : "hbfiwdfbhbh"
}
*/

const resetPassword = async(req, res) => {
    const emailId = req.body.emailID;
    const ans = req.body.answer
    const newPassword = req.body.newPassword

    try {

        const user = await userModel.User.findOne({ emailId: emailId });

        if (!user) {
            console.log('User not found');
            return;
        }

        // Compare the security answer
        if(!user.securityQuestion===ans){
            console.log('Security question answer is incorrect');
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            mesaage : "Password reset sucessfull"
        })

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }



}

module.exports = resetPassword;