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
    //console.log("api end reached")

    try{
        const groupId = req.body.groupId;

        const groupExp = await expenseModel.find({
            groupId : groupId
        }).sort({
            expenseDate : -1
        })

        if(groupExp.length===0) {
            let err = new Error();
            err.status = 400;
            err.message = "Group doesnt have any expenses.";
            throw err;
        }

        let totalExpense = 0;
        for(let exp of groupExp){
            totalExpense += exp.expenseAmount;
        }
        return res.status(200).json({
            message : "Successfulll",
            total : totalExpense ,
            groupExpense : groupExp
        });
    }
    catch(err){
        //console.log(err);
        res.status(err.status).json({
            message: err.message
          });
    }
 
}
module.exports = viewGroupExpense;