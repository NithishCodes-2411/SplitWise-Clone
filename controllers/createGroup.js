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
  "groupTotal": "100"
}                 
*/

const createGroup = async (req, res) => {

  try {
    const newGroup = req.body;


    newGroup.groupMembers.push(newGroup.groupOwner);

    // Checking if the owner is invalid
    const owner = newGroup.groupOwner;
    const checkOwner = await userModel.User.findOne({ emailId: owner });
    if (!checkOwner) {
      return res.json({ message: "Owner was invalid" });
    }

    // Checking if any of the members are invalid
    const usersOfNewGroup = newGroup.groupMembers;
    //const numOfUsers = usersOfNewGroup.length;

    for (let user of usersOfNewGroup) {
      const userFound = await userModel.User.findOne({ emailId: user });

      if (!userFound) {
        return res.send("This member:" + JSON.stringify(user) + "was invalid");
      }
    }

    // Setting initial split of each member in the group to zero
    let splitarr = new Array(numOfUsers).fill(0);
    newGroup.split = splitarr;

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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createGroup;
