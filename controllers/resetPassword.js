const userModel = require('../models/userSchema');
const bcrypt = require('bcrypt');

/* API Name : api/user/resetPassword
ACCEPTS : emailID , newPassword & answer for security Question

This function checks if the answwer for thr secuirty question is right or wring. If it is rigth , then change it password.
Sample req.body : {
    "emailID" : "user1@example.com" ,
   "oldPassword" : "nndsabcbsdc"
    "newPassword" : "hbfiwdfbhbh"
}
*/

const resetPassword = async (req, res) => {
    console.log(req.body)
    const emailId = req.body.emailID;
    const  oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    try {

        const user = await userModel.User.findOne({ emailId: emailId });

      
        const validCard = await bcrypt.compare(oldPassword, user.password);
        console.log(validCard)
        if (!validCard) {
            let err = new Error();
            err.status = 401;
            err.message = "Invalid email or password"
            throw err;
        }
        //console.log(validCard)

       

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            mesaage: "Password reset sucessfull"
        })

    }
    catch (err) {
        return res.status(err.status).json({
            message : err.message
        })
    }
}

module.exports = resetPassword;