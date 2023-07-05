const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    //checking if the API authentication is disabled or not.
//     if (process.env.DISABLE_API_AUTH == "true") {
//        next();
//    }
    // else {

        //checking if the authorization is present in the headere or not.
        if (req.headers['authorization'] == null) {
            res.status(403).json({
                message: "Token not present"
            });
            res.end();
        }
        else {
            //getting the token from request header
            const head = req.headers['authorization'];

            //spliting the string to get the token
            const token = head.split(' ')[1];

            //verify token
            jwt.verify(token, 'defaultSecretKey', (err, user) => {
                if (err) {

                    console.log(err);
                    res.status(403).json({
                        message: "Invalid token"
                    })
                }
                else {
                    //add user data to the req
                    req.user = user;
                    next();
                }
            })
        }
    // }
}

module.exports = validateToken;