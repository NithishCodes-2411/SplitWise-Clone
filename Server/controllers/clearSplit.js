const groupModel = require('../models/groupSchema');

const clearSplit = async (groupId, expenseAmount, expenseOwner, expenseMembers) => {


    //finding the right group
    let group = await groupModel.findOne({
        _id: groupId
    })
    if(!group){
        let err = new Error();
        err.status = 400;
        err.message = "Group not found";
        throw err;
    }
    console.log(group.split[0]+ " before")
    group.groupTotal -= expenseAmount;
    group.split[0][expenseOwner] -= expenseAmount;
    expensePerMember = expenseAmount / expenseMembers.length;
    expensePerMember = expensePerMember.toFixed(2);


    //updating the split values per user 
    for (let user of expenseMembers) {
        group.split[0][user] += expensePerMember;
    }

    let balance = 0;
    for (val of Object.entries(group.split[0])) {
        balance += val[1];
    }
    group.split[0][expenseOwner] -= balance;
    group.split[0][expenseOwner] = group.split[0][expenseOwner].toFixed(2);
    console.log(group.split[0] +  "after ");
   

    return await groupModel.updateOne({
        _id: groupId
    }, group);

}
module.exports = clearSplit;