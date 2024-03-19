const settlementModel = require('../models/settlementSchema');
const groupModel = require('../models/groupSchema');
/*
API name : api/group/makeSettlement
This is an API which makes settlement between two users.

ACCEPTS : GroupId , settleTo , settleFrom  , settleAmount ,settleDate

Sample req.body = {
    "groupId" : "6495c05ef2cf9df18b417baa",
    "settleTo" : "user2@example.gmail.com" , 
    "settleFrom" : "user3example.com" , 
    "settleAmount" : 20
}

*/
const makeSettlement = async (req, res) => {
    try {
        const settlement = req.body;

        //Checking if the group exist
        const group = await groupModel.findOne({
            _id: settlement.groupId
        });
        if (!group) {
            res.status(400).json({
                message: "Group no found"
            })
            return;
        }

        /* ------------------------------------------*/

        //chaning the split in the group acc to the settlement 
        const split = group.split;
        split[0][settlement.settleFrom] = group.split[0][settlement.settleFrom] + settlement.settleAmount;
        const num = group.split[0][settlement.settleTo] - settlement.settleAmount;
        split[0][settlement.settleTo] = num;


        /* ----------------------------------------*/

        //updating the settlement into DB
        const updateGroupSplit = await groupModel.findOneAndUpdate({
            _id: settlement.groupId
        },
            {
                split: split
            })
        let settlementObj = new settlementModel(settlement);
        let updateSettlement = settlementModel.create(settlementObj);

        return res.status(200).json({
            message: "Settlement done successfullly",
            settlementUpdate: updateSettlement,
            splitUpdate: updateGroupSplit
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }

}


module.exports = makeSettlement;