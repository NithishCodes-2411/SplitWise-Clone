const groupModel = require('../models/groupSchema');

const addSplit = async (groupId, expenseAmount, expenseOwner, expenseMembers) => {

    // Fetch the group information from the database based on the groupId
    let group = await groupModel.findOne({
        _id: groupId
    });

    // Check if the group exists, and if not, throw an error with appropriate status and message
    if (!group) {
        let err = new Error();
        err.status = 400;
        err.message = "Group not found";
        throw err;
    }

    // Update the group's total expenses by adding the expenseAmount to it
   
    group.groupTotal += expenseAmount;


    // Update the expense owner's share by adding the expenseAmount to it
    group.split[0][expenseOwner] += expenseAmount;

    // Calculate the equal split amount per person based on the number of expenseMembers
    expensePerPerson = expenseAmount / expenseMembers.length;
    expensePerPerson = expensePerPerson.toFixed(2);
    
    // Update the share of each member in the group by deducting the equal split amount
    for (let user of expenseMembers) {
        group.split[0][user] -= expensePerPerson;
    }

    // Calculate the balance amount to be adjusted for the expense owner
    let bal = 0;
    for (val of Object.entries(group.split[0])) {
        bal += val[1];
    }
    group.split[0][expenseOwner] -= bal;
    group.split[0][expenseOwner] = group.split[0][expenseOwner].toFixed(2);

    

    // Update the group's split information in the database
    return splitSet = await groupModel.updateOne({
        _id: groupId
    }, {
        $set: {
            split: group.split ,
            groupTotal : group.groupTotal
        }
    });
}

module.exports = addSplit;
