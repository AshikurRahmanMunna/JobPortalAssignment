const User = require("../models/User");

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};
exports.signUpService = async (user) => {
  return await User.create(user);
};
