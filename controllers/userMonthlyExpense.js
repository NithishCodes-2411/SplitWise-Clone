const expenseModel = require('../models/expenseSchema');
/*
API NAME : /api/expense/
ACCEPTS : Email id.
This function is used to get the monthly amount spent by a user and Returns Expense per month
and returns expense per month
*/
const userMonthlyExpense = async (req, res) => {
    const emailId = req.body.emailId;
  
    try {
      // Aggregate query to calculate monthly expenses for a user
      const monthlyExpense = await expenseModel.aggregate([
        {
          $match: {
            expenseMembers: { $in: [emailId] } // Filter expenses based on emailId in expenseMembers array
          }
        },
        {
          $group: {
            _id: {
              month: {
                $month: "$expenseDate" // Extract month from expenseDate field
              },
              year: {
                $year: "$expenseDate" // Extract year from expenseDate field
              }
            },
            amount: {
              $sum: "$expensePerMember" // Calculate sum of expensePerMember
            }
          }
        },
        {
          $sort: {
            "_id.month": 1 // Sort by month in ascending order
          }
        }
      ]);
  
      return res.status(200).json({
        message: "Data Fetched successfully",
        data: monthlyExpense
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "There is an error on the server side"
      });
    }
  };
  
  module.exports = userMonthlyExpense;
  