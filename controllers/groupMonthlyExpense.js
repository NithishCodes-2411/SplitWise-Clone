/*
API Name : api/expense/groupMonthlyExpense
Accepts : Group Id
This is the API used to get the monthly expense of a group.
*/
const expenseModel = require('../models/expenseSchema');

const groupMonthlyExpense = async (req, res) => {
  const groupId = req.body.groupId;

  try {
    // Aggregate query to calculate monthly expenses for a group
    const monthlyExpense = await expenseModel.aggregate([
      {
        $match: {
          groupId: groupId
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
            $sum: "$expenseAmount" // Calculate sum of expenseAmount
          }
        }
      },
      {
        $sort: {
          "_id.year": 1, // Sort by year in ascending order
          "_id.month": 1 // Sort by month in ascending order
        }
      }
    ]);

    return res.status(200).json({
      message: "Data fetched successfully",
      data: monthlyExpense
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There is an error on the server side"
    });
  }
};

module.exports = groupMonthlyExpense;
