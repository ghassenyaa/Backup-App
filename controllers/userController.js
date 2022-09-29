const User = require("../models/User");

//Get me (Current User)
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getMe,
};
