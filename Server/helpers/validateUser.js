var jwt = require('jsonwebtoken');

const validateUser = (user, emailId) => {

    if (process.env.DISABLE_API_AUTH != "true" &&
        user != emailId
    ) {
        return false
    } else
        return true
}

module.exports = validateUser;