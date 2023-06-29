const groupModel = require('../models/groupSchema');
const simplifySplit = require('./simplifySplit');
/*
API Name : api/group/groupBalanceSheet

Accepts : groupId

*/

const groupBalanceSheet = async (req, res) => {

    try {
        //checking whether the group exist or not
        const group = await groupModel.findOne({
            _id: req.body.groupId
        })
        if (!group) {
            res.status(400).json({
                message: "Group not found"
            })
            return;
        }

        //console.log(group.split[0]);

        res.status(200).json({
            data: simplifySplit(group.split[0])
        })

    }
    catch (err) {

        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });

    }





}

module.exports = groupBalanceSheet;