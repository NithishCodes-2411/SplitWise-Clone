const expenseModel = require('../models/expenseSchema');
/*
API Name : api/expense/viewExpense.
This is  the api which holds a function which returns all the details about an expense 
provided the expenseId 
*/
const viewExpense = async(req , res) => {

    try{

        const expense =  await  expenseModel.findOne({
            _id : req.body.expenseId
        })
        if(expense){
            res.status(200).json({
                exp : expense
            })
        }
        else{
            res.status(404).json({
                message : "expense not found"
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      } 

    }


module.exports = viewExpense;