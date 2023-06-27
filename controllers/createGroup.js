const Group = require('../models/groupSchema');
const userModel = require('../models/userSchema');

/*
API name: api/group/createGroup
Accepts:
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
  "groupTotal": 100
}                 
*/

const createGroup = async (req, res) => {

  try {


    const newGroup = req.body;


    
    // Checking if the owner is invalid
    const owner = newGroup.groupOwner;
    const checkOwner = await userModel.User.findOne({ emailId: owner });
    if (!checkOwner) {
      return res.json({ message: "Owner was invalid" });
    }
    //adding the groupOwner as groupMember
    //newGroup.groupMembers.push(newGroup.groupOwner);

    /* -------------------------------------------------*/


    // Checking if any of the members are invalid and setting the initial split of members to zero.
    const usersOfNewGroup = newGroup.groupMembers;

    let splitJson = {}; // splitJson is an json user email as they key and splitAmount currently set to 0.
   
    for (let user of usersOfNewGroup) {
      const userFound = await userModel.User.findOne({ emailId: user });

      if (!userFound) {
        return res.send("This member:" + JSON.stringify(user) + "was invalid");
      }
      splitJson[user] = 0;

    }
    newGroup.split = splitJson;

     /* -------------------------------------------------*/


    //creating an instance of a group to save it,
    const newGroupinstance = new Group(newGroup);

    newGroupinstance.save((error, savedData) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json({
          message: "Data Saved successfully",
          Id: newGroupinstance._id
        });
      }
    });


  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createGroup;
