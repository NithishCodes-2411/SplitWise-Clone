const model = require('../models/userSchema');

/* 
API name : api/user/editUser
Accepts : email id , first and lastName
(Note : email id cannot be chaged in this API.
This API is only to edit the first and last name )
sample req.body : {
    emailId : "nituuu2411@gmaul.com" ,
    firstName : "kjfbkjs",
    lastName : "hfiwufb" 
}

*/

const editUser = async (req, res) => {

    try {

        //checking if the user exist
        const user = await model.User.findOne({
            emailId: req.body.emailId
        }, {
            password: 0
        })

        if (!user) {
            let err = new Error();
            err.status = 400;
            err.message = "User does not exist";
            throw err;

        }

        //editing the user
        const editUser = req.body;

        const result = await model.User.updateOne({
            emailId: editUser.emailId
        },
            {
                $set: {
                    firstName: editUser.firstName,
                    lastName: editUser.lastName,
                }
            })
        res.status(200).json({
            message: "User updated succesfully",
            user: result
        })


    }
    catch (err) {
        console.log(err)
        res.status(err.status).json({
            message: err.message
          }); 
    }

}
module.exports = editUser;