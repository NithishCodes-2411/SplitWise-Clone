const groupModel = require('../models/groupSchema');
const _ = require('lodash');

/* API NAME: api/group/addGroupMember
ACCEPTS: addMember, groupId

This function checks if the group member doesn't
exist in the group. If the member exists, it will not add them.

Sample req.body: {
  "groupId": "6495c05ef2cf9df18b417baa",
  "groupMemberAdd": "user2@example.com"
}
*/

const addGroupMember = async (req, res) => {
    try {
        const addUser = req.body;

        const group = await groupModel.findOne({
            _id: addUser.groupId
        });

        if (!group) {
            return res.status(404).json({
                message: "Invalid group ID"
            });
        }

        console.log(group.split[0]);

        const update_Split = group.split[0];

        if (!group.split[0].hasOwnProperty(addUser.groupMemberAdd)) {

            update_Split[addUser.groupMemberAdd] = 0;
            update_Split.add(addUser.groupMemberAdd, 0);
            console.log("--" + update_Split)
            group.save();

            return res.status(200).json({
                message: "Group member added"
            });
        } else {
            return res.status(400).json({
                message: "Group member already exists in the group"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = addGroupMember;
