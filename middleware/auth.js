const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes middleware
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // check the authorization header sent with the request
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } /*else if (req.cookies.token) {
    token = req.cookies.token;
  }*/

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    // verify token extracting the payload {id:1,iat:xxx,exp:xxx}
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // adding the logged in user to the request
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
