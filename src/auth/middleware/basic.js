'use strict';
require('dotenv').config();
const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization)
   next('authorizationheaderis not provided');



  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');
    const authenticatedUser = await User.authenticateBasic(user, pass)
    req.user=authenticatedUser;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}