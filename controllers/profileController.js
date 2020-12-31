const User = require("../models/User");
const Profile = require("../models/Profile");

// @route   GET api/profile/me
// @desc    Get current, logged in user profile
// @access  Private
const getCurrentUserProfile = async (req, res) => {
  try {
    // Get profile by the ID from authProtect - Private
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getCurrentUserProfile };
