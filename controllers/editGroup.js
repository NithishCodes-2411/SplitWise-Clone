const groupModel = require('../models/groupSchema');
const userModel = require('../models/userSchema');

/*
API name : api/group/editGroup
ACCEPTS  : accepts groupId 
           and modified group Info
(Note : This api is just to edit the group details not the group expense of group members or add/delete group members.
But still it recieves groupMembers from the front end to check whether the they are still valid) 

Example req.body:
{
    "id" : "648e35c78752e8db1b7a9d93",
    "groupName" : "most wanted",
    "groupDescription" : "hbvkhufbv",
    "groupcurrency" : "INR" , 
    "groupOwner" : "nith2411@gmail.com" ,
    "groupMembers" : [ "user1@example.com" , "user2@example.com" , "user3@example.com"],
    "groupCategory" : "Groends"

}            
*/


const editGroup = async (req, res) => {


    try {
 
        //Finding the right group
        const group = await groupModel.findOne({
            _id: req.body.id
        })
        if (!group) return res.status(400).json({ message: "Inavlid group ID" });

        let editGroup = new groupModel(req.body);
        editGroup.split = group.split;


        const usersOfNewGroup = req.body.groupMembers;

        //console.log(usersOfNewGroup);
        if (!Array.isArray(usersOfNewGroup)) {
            return res.status(400).json({
                message: "Invalid group members provided"
            });
        }

        for (let user of usersOfNewGroup) {
            const userFound = await userModel.User.findOne({
                emailId: user
            });

            if (!userFound) {
                return res.status(400).json({
                    message: `Invalid member: ${user}`
                });
            }
        }

        let updateResponse = await groupModel.updateOne({
            _id: req.body.id
        }, {
            $set: {
                groupName: editGroup.groupName,
                groupDescription: editGroup.groupDescription,
                groupCurrency: editGroup.groupCurrency,
                groupMembers: editGroup.groupMembers,
                groupCategory: editGroup.groupCategory,
                split: editGroup.split
            }
        });
        res.status(200).json({
            message: "Group updated successfully",
            responseStatus: updateResponse
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = editGroup;
