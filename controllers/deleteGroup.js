const groupModel = require('../models/groupSchema');
const validateGroupId = require('../helpers/validateGroupId');

/*
API name : api/group/deleteGroup
Accepts : groupID

This api recieves the group if amd deletes the group from the data database.
 (Note:Only the group Owner can  delete the group.)

 Example req.body :
{
    "id" : "648e35c78752e8db1b7a9d93"
}
*/



const deleteGroup = async (req, res) => {

    try {

        //Finding if the group if is of the correct regular expression
        const groupId = req.body.id;
        const groupidValid = validateGroupId(groupId);

        if (groupidValid) {

            //checking if the group is existing
            const groupFound = await groupModel.findOne({
                _id: groupId
            });
            console.log(groupFound);
            if (!groupFound) {
                res.status(404).json({
                    message: "Group not found"
                })
                return;
            }

            /* -------------------------------------------------*/


            //deleteing the group
            let deleteGroup = await groupModel.deleteOne({
                _id: groupId
            })
            res.status(200).json({
                message: "Group deleted successfully",
                deleteStatus: deleteGroup
            })

        }
        else {
            res.status(400).json({
                message: "Group id inValid"
            })
            return;
        }

    }
    catch (error) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = deleteGroup;


