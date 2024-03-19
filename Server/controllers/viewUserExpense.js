const expenseModel = require('../models/expenseSchema');
/* 
API Name : api/expense/viewUserExpense
Accepts ; groupId.
This function finds the sum of expensePerMember of all expense in which the given user is involved
*/

const viewUserExp = async(req , res) => {

    try{
        
        const emailId = req.body.emailId;
        const userExp = await expenseModel.find({
            expenseMembers: { $in: [emailId] }
        }).sort({
            expenseDate : -1
        })
       
        if(userExp.length===0) return res.status(404).json({ message : "No expense found for the user or email maybe incorrect"});
      
        //console.log(userExp);
        let totalExpense = 0;
        for(let exp of userExp){
            totalExpense += exp.expensePerMember;
        }
        return res.status(200).json({
            message : "Successfulll",
            total : totalExpense
        });

    }
    catch(err){
        console.loh(err);
        res.status(500).json({ message: 'Internal server error' });
    }

    
}
module.exports = viewUserExp;