const expenseModel = require('../models/expenseSchema');

const viewUserExp = async(req , res) => {

    try{
        
        const emailId = req.body.emailID;
        const userExp = await expenseModel.find({
             expenseMembers: { $in: [emailId] }
        }).sort({
            expenseDate : -1
        })
       

        //if(userExp.length===0) return res.status(404).json({ message : "No expense found for the user or email maybe incorrect"});
        if (!userExp.includes(emailId)) {
            return res.status(404).json({ message: "No expense found for the user or email may be incorrect" });
          }

        console.log(userExp);



    }
    catch(err){
        console.loh(err);
        res.status(500).json({ message: 'Internal server error' });
    }

    
}
module.exports = viewUserExp;