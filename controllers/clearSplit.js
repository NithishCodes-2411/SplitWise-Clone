const groupModel = require('../models/groupSchema');
const clearSplit = (oldExpense) => {

    let groupId = oldExpense.groupId ;
    let expenseAmount = oldExpesne.groupAmount;
    let expenseOwner = oldExpense.expenseOwner ; 
    let expenseMembers = oldExpense.expenseMembers;
    let expensePerMember = expenseAmount / expenseMembers.length;

    //finding the right group


    let group = groupModel.findOne({
        _id : groupId
    })

    group.groupTotal -= expenseAmount;
    group.split[0][expenseOwner] -= expenseAmount;
    expensePerMember = Math.round(expensePerPerson + Number.EPSILON) * 100 / 100;






}
module.exports = clearSplit;