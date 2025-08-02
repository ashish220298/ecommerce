const jwt = require('jsonwebtoken');
require('dotenv').config()

function auth(req, res, next) {
  const token = req.header('Authorization');
  
  console.log(token)
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });
   if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;