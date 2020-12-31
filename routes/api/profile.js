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

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", profileController.getAllProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:userId", profileController.getProfileByUserId);

module.exports = router;
