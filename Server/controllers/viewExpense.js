const expenseModel = require('../models/expenseSchema');
/*
API Name : api/expense/viewExpense.
This is  the api which holds a function which returns all the details about an expense 
provided the expenseId 
*/
const viewExpense = async (req, res) => {

    try {

        const expense = await expenseModel.findOne({
            _id: req.body.expenseId
        })
        if (expense) {
            res.status(200).json({
                exp: expense
            })
        }
        else {
            let err = new Error();
            err.status = 400;
            err.message = "Expense Not found";
            throw err;
        }

    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({
            message: err.message
          });
    }

}


module.exports = viewExpense;