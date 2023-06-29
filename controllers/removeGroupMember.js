const groupModel = require('../models/groupSchema');
const _ = require('lodash');

/* API NAME ; api/group/removeGroupMember
ACCEPTS : removeMember , groupId

This function checks if the groupmember 
exist is the group and check if his split is zero , 
if it is xero it will remove him/her.

Sample req.bod : {
    "groupId" : "6495c05ef2cf9df18b417baa",
    "groupMemberRemove" : "user2@example.com"
}
*/

const removeGroupMember = async (req, res) => {
    try {
        const removeUser = req.body;

        const group = await groupModel.findOne({
            _id: removeUser.groupId
        });

        if (!group) {
            res.status(404).json({
                message: "invalid group id"
            })
        }

        if (!group.split[0].hasOwnProperty(removeUser.groupMemberRemove)) {
            return res.status(404).json({
                message: "Group Memeber not found"
            })
        }

        if (group.split[0][removeUser.groupMemberRemove] === 0) {

            let updateSplit = _.omit(group.split[0], removeUser.groupMemberRemove);
            group.split = updateSplit
            //console.log(group.split)
            await group.save();
            return res.status(200).json({
                message: "group Member removed succesfully"
            })


        }
        else {
            res.status(400).json({
                message: "The member havent settled some debt so he cant be removed from the group "
            })
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = removeGroupMember;