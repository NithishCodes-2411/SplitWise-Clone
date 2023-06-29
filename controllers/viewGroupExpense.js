const expenseModel = require('../models/expenseSchema');

/*
API Name :  api/expense/viewGroupExpense
ACCEPTS : groupId
This is the function that  accepts groupId and calculate the sum of expenseAmount found for that specific group

Sample req.body : {
    "groupId" : "6495c05ef2cf9df18b417baa"
}
*/
const viewGroupExpense = async(req , res) =>{

    try{
        const groupId = req.body.groupId;

        const groupExp = await expenseModel.find({
            groupId : groupId
        }).sort({
            expenseDate : -1
        })

        if(groupExp.length===0) return res.status(404).json({ message : "No expense found for the group or groupId maybe incorrect"});

        let totalExpense = 0;
        for(let exp of groupExp){
            totalExpense += exp.expenseAmount;
        }
        return res.status(200).json({
            message : "Successfulll",
            total : totalExpense
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "There is an error in the server side"
        });
    }
 
}
module.exports = viewGroupExpense;