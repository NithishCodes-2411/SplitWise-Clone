const groupModel = require('../models/groupSchema');

const clearSplit = async (groupId, expenseAmount, expenseOwner, expenseMembers) => {


    //finding the right group
    let group = await groupModel.findOne({
        _id: groupId
    })
    group.groupTotal -= expenseAmount;


    group.split[expenseOwner] -= expenseAmount;
    let expensePerMember = expenseAmount / expenseMembers.length;
    expensePerMember = Math.round(expensePerMember + Number.EPSILON) * 100 / 100;

    //updating the split values per user 
    for (let user of expenseMembers) {
        group.split[0][user] += expensePerMember;
    }

    let balance = 0;
    for (val of Object.entries(group.split[0])) {
        balance += val[1];
    }
    group.split[0][expenseOwner] -= balance;
    group.split[0][expenseOwner] = Math.round((group.split[0][expenseOwner]) * 100) / 100;

    return await groupModel.updateOne({
        _id: groupId
    }, group);

}
module.exports = clearSplit;