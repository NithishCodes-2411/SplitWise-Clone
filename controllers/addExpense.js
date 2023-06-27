const groupModel = require('../models/groupSchema');
const validateGroupId = require('../helpers/validateGroupId');
const userModel = require('../models/userSchema');
const expenseModel = require('../models/expenseSchema');
const addSplit = require('../controllers/addSplit');


/*

API name : /api/group/addExpense
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

        let expense = req.body;


        //Checking if the id is of the correct regular expression 
        const groupIdValid = validateGroupId(expense.groupId);

        if (!groupIdValid) {
            res.status(400).json({
                message: "Group id inValid"
            })
            return;
        }

        /* -------------------------------------------------*/


        //Checking if the group exist
        const groupFound = await groupModel.findOne({
            _id: expense.groupId
        });

        if (!groupFound) {
            res.status(400).json({
                message: "Group notfound"
            })
            return;
        }

        /* -------------------------------------------------*/


        //Checking if the owner is a valid user
        const owner = expense.expenseOwner;

        const checkOwner = await userModel.User.findOne({ emailId: owner });
        if (!checkOwner || checkOwner === null) {
            return res.json({ message: "Owner was invalid" });
        }

        /* -------------------------------------------------*/

        //checking if the expenseMembers are valid
        const usersOfExpense = expense.expenseMembers;


        if (!Array.isArray(usersOfExpense)) {
            return res.status(400).json({
                message: "Invalid group members provided"
            });
        }
        for (let user of usersOfExpense) {
            const userFound = await userModel.User.findOne({
                emailId: user
            });

            if (!userFound) {
                return res.status(400).json({
                    message: `Invalid member: ${user}`
                });
            }
        }

        /* -------------------------------------------------*/

        expense.expensePerMember = expense.expenseAmount / expense.expenseMembers.length;
        //console.log(expense)
        const newExp = new expenseModel(expense);

        const addSplitFunCall = await addSplit( expense.groupId, expense.expenseAmount, expense.expenseOwner, expense.expenseMembers);



        let newExpense = await expenseModel.create(newExp);
        //console.log("all is well" , newExpense)

        res.status(200).json({
            message: "New expenses added",
            Id: newExpense._id,
            splitUpdateResponse: addSplitFunCall
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      } 

    }



module.exports = addExpense;