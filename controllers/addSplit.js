/* 
Add Split function :

This function is called when a new expense is added.
This function updates the memeber's split amunt present in the group.
Parameters : groupId ,expenseAmount , expenseOwner , expenseMembers

(Note : This function is not a direct API hit , it gets called when this api => "api/group/addExpense" gets hit)

*/


const groupModel = require('../models/groupSchema');

const addSplit =  async (groupId , expenseAmount , expenseOwner , expenseMembers) => {

    let group = await groupModel.findOne({
        _id : groupId
    })
    if(!group){
        res.status(400).json({
            message: "Group notfound"
        })
        return;
    }
    
    group.groupTotal -= expenseAmount;
    group.split[0][expenseOwner] -= expenseAmount;
    

    //console.log(group.split[0][expenseOwner])
    expensePerPerson = expenseAmount / expenseMembers.length;
    expensePerPerson = Math.round((expensePerPerson  + Number.EPSILON) * 100) / 100;

    //updating the split values per user
    for (let user of expenseMembers){
        group.split[0][user] += expensePerPerson;
    }

    let bal = 0;
    for(val of Object.entries(group.split[0])){
        bal += val;
    }
    group.split[0][expenseOwner] -= bal;
    group.split[0][expenseOwner] = Math.round((group.split[0][expenseOwner] + Number.EPSILON) * 100 ) / 100;

    //updating back the split values to the group
    //console.log(group.split);

    return  splitSet = await groupModel.updateOne({
        _id : groupId
    } , {
        $set:{
            split : group.split 
        }
    });
    
}

module.exports = addSplit;