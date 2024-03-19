const userModel = require('../models/userSchema');
const groupModel = require('../models/groupSchema');

/* 
API Name : /api/group/findUserGroup
Accepts : User email ID
This api finds the group that a user belongs
*/

const findUserGroup = async (req, res) => {

    try {

        const { emailId } = req.body;

        //Checking if the user exist in the database
        const user = await userModel.User.findOne({
            emailId: emailId
        })
        if (!user) {
            let err = new Error();
            err.status = 401;
            err.message = "Invalid user";
            throw err;
        }

        //finding the group in which the user belongs to  
        const groups = await groupModel.find({
            groupMembers: emailId
        }).sort({
            $natural: -1 //to get the newest first
        })
        const numOfGroup = groups.length;
        //console.log(numOfGroup + "dbcibkc")
       // console.log(groups);

        res.status(200).json({
            groups: groups , 
            numOfGroup : numOfGroup
        })

    }

    catch (err) {
        console.log(err);
        res.status(err.status).json({
            message: err.message
        });
    }

}

module.exports = findUserGroup;