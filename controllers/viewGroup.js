const Group = require('../models/groupSchema');

/*
API name : /api/group/viewUser
Accepts : Group id  
*/

const viewgroup = async (req, res) => {

    try {

        const { groupId } = req.body;
        const group = await Group.findOne({ _id: groupId });
        if (!group) {
            res.send("Group not found");
            return;
        }
        return res.send(group);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });

    }


}

module.exports = viewgroup;
