const Group = require('../models/groupSchema');

/*
API name : /api/group/viewGroup
Accepts : Group id  
*/

const viewgroup = async (req, res) => {

    try {

        const { groupId } = req.body;
        //console.log(groupId)
        const group = await Group.findOne({ _id: groupId });
        if (!group) {
            let err = new Error();
            err.status = 401;
            err.message = "Group Not Found";
            throw err;
           
        }
        return res.status(200).json({
            group : group
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });

    }


}

module.exports = viewgroup;
