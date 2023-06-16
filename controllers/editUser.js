const model = require('../models/schema');
const validateUser =  require('../helpers/validateUser');

/* 
API name : api/user/editUser
Accepts : User data 
(Note : email id cannot be chaged in this API.
This API is only to edit the first and last name )
*/

const editUser = async (req, res) => {

    try {
        //checking if the login user is same as the requested user
        validateUser(req.user, req.body.emailId);
        if (!validateUser) return res.status(402).json({ message: "user invalid" });

        //checking if the user exist
        const user = await model.User.findOne({
            emailId: req.body.emailId
        }, {
            password: 0
        })

        if (!user) {
            res.status(400).json({
                message: "USer does not found or exist"
            })
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
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }

}
module.exports = editUser;