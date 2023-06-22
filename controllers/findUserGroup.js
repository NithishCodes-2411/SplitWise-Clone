const userModel = require('../models/userSchema');
const groupModel = require('../models/groupSchema');

/* 
API Name : /api/group/findUserGroup
Accepts : User email ID
This api finds the group that a user belongs
*/

const findUserGroup = async(req , res) =>{

    try {

        const {emailId} = req.body;
        
        //Checking if the user exist in the database
        const user = await userModel.User.findOne({
            emailId :emailId
        })
        if(!user){
            return res.status(400).json({
                message : "User id not found"
            })
        }
      
        //finding the group in which the user belongs to  
        const groups = await groupModel.find({
            groupMembers : emailId
        }).sort({
            $natural : -1 //to get the newest first
        })
        res.status(200).json({
            groups : groups
        })

    }
    
    catch (err){
        console.log(err);
        res.status(404).json({
            message : "some internal error"
        })

    }

}

module.exports = findUserGroup;