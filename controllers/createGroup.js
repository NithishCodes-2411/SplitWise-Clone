const groupModel = require('../models/groupSchema');
const validateUser = require('../helpers/validateUser');
const userModel = require('../models/userSchema');
/*
API name : api/group/createGroup
Accepts : 
{
  "groupName": "Name",
  "groupDescription": "Some random String",
  "groupCurrency": "CAD",
  "groupOwner": "some emailId",
  "groupMembers": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "user4@example.com",
    "user5@example.com"
  ],
  "groupCategory": "Friends",
  "groupTotal": "100"
}                 

 */
const createGroup = async (req, res) => {

    try {

        const newGroup = req.body;

        //checking if the owner is invalid
        const owner = newGroup.groupOwner;
        const checkOwner = await userModel.User.findOne({
            emailId: owner
        })
        if (!checkOwner) return res.JSON({
            message: "Owner was invalid"
        })

        // checking if any of the members are invalid 
  
        const usersOfNewGroup = newGroup.groupMembers;
        const numOfUsers = 1;

        for (let user of usersOfNewGroup) {
            const userFound = await userModel.User.findOne({
                emailId: user
    
            })
            console.log("x")

            if (!userFound) {
                return res.send("This member :" + JSON.stringify(user) + "was invalid");
            }
            numOfUsers++;
        }

        //setting initial split of each member in the group  to zero
        let splitarr = new Array[numOfUsers];
        for (let eachSplit of splitarr) {
            eachSplit = 0;
            console.log("y")
        }
        newGroup.split = splitarr;

        const id = await groupModel.create(newGroup);
        res.status(200).json({
            message: "Group Creation Success",
            Id: id._id
        })
        res.end();


    }
    catch (error) {
        console.log(error);
    }



}

module.exports = createGroup;