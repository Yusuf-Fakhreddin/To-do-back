const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc  Register user
// @route  POST /api/v1/auth/register
// @access   Publice

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //create user
  const user = await User.create({
    name,
    email,
    password,
  });

  /* replaced this with helper function

  // create token with the User model method
  const token = user.createSignedJwtToken();

  // we send the token in the response
  res.status(200).json({ success: true, token });
  
 */
  /* create token and send it in a cookie and response */
  sendTokenResponse(user, 200, res);
});

// @desc  Register user
// @route  POST /api/v1/auth/register
// @access   Publice

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check that email & password entered
  if (!email || !password) {
    // we are creating an error because it's not a thrown handled error
    // it's error we choose to make
    return next(new ErrorResponse('Please enter an email and password', 400));
  }

  // getting the user selecting password as it's not included in selection in the schema definetion
  const user = await User.findOne({ email }).select('+password');

  // check for user email existance
  if (!user) {
    return next(new ErrorResponse('invalid email', 401));
  }

  // check if the login entered password matches the email registered password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('invalid password', 401));
  }

  // if email and password are correct we proceed and send the token and log the user in

  /* replaced this with helper function

  // create token with the User model method
  const token = user.createSignedJwtToken();

  // we send the token in the response
  res.status(200).json({ success: true, token });
  
 */
  /* create token and send it in a cookie and response */
  sendTokenResponse(user, 200, res);
});

// helper function to Get token for user from the model methd, create cookie and send it in the response

const sendTokenResponse = (user, statusCode, res) => {
  // create token with the User model method
  const token = user.createSignedJwtToken();

  const options = {
    // cookie expires with the jwt expiration in 30 days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // the cookie to be accessed through the client side script only
    httpOnly: true,
  };

  // cookie is sent with https in production env only
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // cookie(name,value,options)
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    // sending the coookie in the response after sending it in a cookie and it's up to the client side how they want to handle it
    token,
  });
};

// @desc  Get current logged in user
// @route  POST /api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
