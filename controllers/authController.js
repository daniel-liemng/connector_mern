const User = require("../models/User");

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { authUser };
