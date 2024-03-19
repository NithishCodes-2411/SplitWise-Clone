const groupModel = require('../models/groupSchema');
const validateGroupId = require('../helpers/validateGroupId');
const userModel = require('../models/userSchema');
const expenseModel = require('../models/expenseSchema');
const addSplit = require('../controllers/addSplit');


/*

API name : /api/expense/addExpense
This is a function which helps add an expesne of a group
ACCEPTS : Group id not null and groupId exist in DB . It also accepts Expense name , Expesnse description , Expense amount , Expense owner .

Sample req.body : {
  "groupId": "648e371e76747b3bf470719a",
  "expenseName": "Sunday dinner",
  "expenseOwner": "nith2411@gmail.com",
  "expenseDescription": "This is for the dinner at Taj Coramandel",
  "expenseMembers": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "user4@example.com",
    "user5@example.com"
  ],
  "expenseAmount": 100
}

*/

const addExpense = async (req, res) => {

    try {

        let expense = req.body.data;
   
        const groupFound = await groupModel.findOne({
            _id: expense.groupId
        });

        if (!groupFound) {

            let err = new Error();
            err.status = 400;
            err.message = "Group Not found";
            throw err;
        }

        //Checking if the owner is a valid user
        const owner = expense.expenseOwner;

        const checkOwner = await userModel.User.findOne({ emailId: owner });
        if (!checkOwner || checkOwner === null) {
            let err = new Error();
            err.status = 400;
            err.message = "owner was invalid";
            throw err;
        }

        expense.expensePerMember = expense.expenseAmount / expense.expenseMembers.length;
   
        const newExp = new expenseModel(expense);

        const addSplitFunCall = await addSplit(expense.groupId, expense.expenseAmount, expense.expenseOwner, expense.expenseMembers);



        let newExpense = await expenseModel.create(newExp);

       
        res.status(200).json({
            message: "New expenses added",
            Id: newExpense._id,
            splitUpdateResponse: addSplitFunCall
        })

    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({
            message: err.message
          });
        
    }

}


module.exports = addExpense;