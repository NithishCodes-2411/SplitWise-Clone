const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || 'defaultSecretKey';
  return jwt.sign(user, secret);
  
};
