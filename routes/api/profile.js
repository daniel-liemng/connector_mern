const authProtect = require("../../middleware/authMiddleware");
const profileController = require("../../controllers/profileController");
const { profileValidator } = require("../../validator/profileValidator");

const router = require("express").Router();

// @route   GET api/profile/me
// @desc    Get current, logged in user profile
// @access  Private
router.get("/me", authProtect, profileController.getCurrentUserProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  authProtect,
  profileValidator,
  profileController.createUpdateProfile
);

module.exports = router;
