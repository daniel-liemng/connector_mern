const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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

// @route   POST api/auth
// @desc    Login user: Authenticate user and get token
// @access  Public
const loginUser = async (req, res) => {
  // 1. See if user not exists
  // 2. Compare password with hashPassword, if matched
  // 3. Return jwt

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { authUser, loginUser };
