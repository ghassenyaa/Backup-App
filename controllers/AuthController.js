const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
};

const authentication = async (req, res, next) => {
  // 1) Getting token and check if it's there

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send("error token");
  }

  // 2) validate token

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json(error);
  }

  // 3)check if user still exist

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(400).send("user disconnected");
  }

  req.user = currentUser;

  next();
};

module.exports = {
  login,
  authentication,
};
