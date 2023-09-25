const jwt = require('jsonwebtoken');
const queue = require('../utils/queue')
const { JWT_SECRET } = require('../config/config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (queue.include(token)) return res.status(401).json({ error: "unauthorized"}); //checks if user is logged out
   
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
