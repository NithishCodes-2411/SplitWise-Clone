const model = require('../models/schema');
const validateUser = require('../helpers/validateUser');

/*
API name : /api/user/viewUser
Accepts : user Email Id
*/

const viewUser = async (req, res) => {
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
        res.status(200).json({
            message: "Success",
            user: user
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }
}

module.exports = viewUser;