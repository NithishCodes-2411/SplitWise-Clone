const expenseModel = require('../models/expenseSchema');
const clearSplit = require('../controllers/clearSplit');

/*
API name : api/expense/deleteExpense
This function is used to delete the expense added to the group.

Accepts :(expenseId)

*/

const deleteExpense = async (req, res) => {

   try {

      const expense = await expenseModel.findOne({
         _id: req.body.expenseId
      })

      if (!expense) {
         let err = new Error();
         err.status = 400;
         err.message = "Expense Not found";
         throw err;
      }
      const deleteExpense = await expenseModel.deleteOne({
         _id: req.body.expenseId
      })

      await clearSplit(expense.groupId, expense.expenseAmount, expense.expenseOwner, expense.expenseMembers);

      res.status(200).json({
         message: "Expense deleted",
         response: deleteExpense
      })

   }
   catch (err) {

      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
   }
}


module.exports = deleteExpense;