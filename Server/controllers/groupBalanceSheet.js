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
            let err = new Error();
            err.status = 400;
            err.message = "Group not found";
            throw err;
        }

        res.status(200).json({
            daaa: simplifySplit(group.split[0])
        })

    }
    catch (err) {

        console.log(err);
        
    }
}

module.exports = groupBalanceSheet;