const model = require('../models/userSchema');
const validateUser = require('../helpers/validateUser');

/*
API name: /api/user/viewUser
Accepts: user Email Id
sample req.body: {
    emailId: "nituu2411@gmail.com"
}
*/

const viewUser = async (req, res) => {
  try {
    // checking if the user exists
    const user = await model.User.findOne(
      {
        emailId: req.body.emailId
      },
      {
        password: 0
      }
    );
    //console.log(req.body.emailId + " backend re.body ")

    if (!user) {
      let err = new Error();
      err.status = 400;
      err.message = "User does not exist";
      throw err;
    }

    //console.log(user + "backend");
    return res.status(200).json({
      message: "Success",
      data: user
    });
  } catch (err) {
    //console.log(err.message);
    res.status(err.status).json({
      message: err.message
    });
  }
};

module.exports = viewUser;
