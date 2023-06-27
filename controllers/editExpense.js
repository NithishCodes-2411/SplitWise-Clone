const expenseModel = require('../models/expenseSchema');
const userModel = require('../models/userSchema');
const clearSplit = require('../controllers/clearSplit');

/*
API Name : api/expense/editExpense
Accepts : Group Id , ExpenseID , Expense Name , Expense Desc (MAx 100) , Expense Owner , Expense MEmbers

This api just edits the expense that was previously added

Sample req.body : {
    "groupId" : "6495c05ef2cf9df18b417baa" , 
    "expenseId" : "6495d46749e997361f1ee708" , 
    "expenseName" : "Sunday dinner" , 
    "expenseOwner" : "user2@example.com" , 
    "expenseDescription" : "Savatikka savatikaa savatikaaa" , 
    "expenseAmount" : 250 , 
    "expenseType" : "cash" ,
    "expenseMembers" : ["user1@example.com","nith2411@gmail.com","user3@example.com" ,"user4@example.com" , "user5@example.com"]
}
*/


const editExpense = async (req, res) => {

    try {

        const expense = req.body;
        console.log(expense);

        let oldExpense = await expenseModel.findOne({
            _id : expense.expenseId
        })
        console.log(oldExpense)
      


        // Checking if the owner is invalid
        const owner = expense.expenseOwner;
        const checkOwner = await userModel.User.findOne({ emailId: owner });
        if (!checkOwner) {
            return res.json({ message: "Owner was invalid" });
        }


        /* -------------------------------------------------*/


        for (let user of req.body.expenseMembers) {

            var memberCheck = await userModel.User.findOne({
                emailId: user
            })

            if (!memberCheck) {
                return res.status(404).json({
                    message: "Please ensure the members are valid"
                })
            }
        }

       
        /* -------------------------------------------------*/

        const expenseUpdate = await expenseModel.findOneAndUpdate(
            { _id: expense.expenseId },
            {
                $set: {
                    groupId: expense.groupId,
                    expenseName: expense.expenseName,
                    expenseDescription: expense.expenseDescription,
                    expenseOwner: expense.expenseOwner,
                    expenseType: expense.expenseType,
                    expenseDate: expense.expenseDate,
                    expensePerMember: expense.expenseAmount / expense.expenseMembers.length ,
                    expenseAmount : expense.expenseAmount
                }
            }
           
        );

       await clearSplit(oldExpense.groupId , oldExpense.expenseAmount   , oldExpense.expenseOwner  ,oldExpense.expenseMembers);
       await addSplit (expense.groupId , expense.expenseAmount , expense.expenseOwner , expense.expenseMembers);


        return res.status(200).json({
            message: "Changed edited successfully",
            updateResponse: expenseUpdate
        })

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = editExpense;