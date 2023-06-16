const model = require('../models/schema');
const { ObjectId } = require('mongodb');
const validateUser =  require('../helpers/validateUser');


/* 
API name : /api/user/deleteUser
Accepts : emailId
*/
const deleteUser = async (req, res) => {

    try {

        //checking if the login user is same as the requested user
        validateUser(req.user, req.body.emailId);
        if (!validateUser) return res.status(402).json({ message: "user invalid" });

        //finding the right user to delete
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })
        
        if (!user) {
            res.status(400).json({
                message: "USer does not found or exist"
            })
        }

        //deleting the right user
        const result = await model.User.deleteOne({ _id: ObjectId(user) });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: "User deleted successfully"
            })
        }
        else {
            res.status(404).json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }

}

module.exports = deleteUser;

